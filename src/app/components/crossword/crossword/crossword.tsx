"use client"

import CrosswordCell from "@/app/components/crossword/crossword-cell/crossword-cell";
import CrosswordDefinition from "@/app/components/crossword/crossword-definition/crossword-definition";
import clsx from "clsx";
import styles from "./crossword.module.scss";
import {Keys} from "@/app/entities/keys";
import {CrosswordActionType} from "@/app/entities/crossword/actions";
import {useEffect, useMemo, useReducer, useRef, useState} from "react";
import {CrosswordData} from "@/app/entities/crossword/crossword";
import {crosswordReducer} from "@/app/reducers/crossword";
import {createEmptyState} from "@/app/entities/crossword/state";
import {useModal} from "@/app/hooks/use-modal";
import {
    completeCrosswordSublevel,
    getLevelInfo,
    getSublevelInfo,
    getSublevelsInfo
} from "@/app/actions/crossword-actions";
import {useLoadingStore} from "@/app/store/loading.store";

type Props = {
    data: CrosswordData;
    sublevelId: number;
};

export default function Crossword({ data, sublevelId }: Props) {
    const [state, dispatch] = useReducer(crosswordReducer, undefined, createEmptyState);
    const [hasCompleted, setHasCompleted] = useState(false);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const shouldFocusFirstRef = useRef(false);
    const shouldAutoAdvanceRef = useRef(false);
    const { openModal } = useModal();

    const setLoading = useLoadingStore((s) => s.setLoading);

    const orientation = useMemo(() => {
        return state.wordsProperties[state.activePosition]?.orientation ?? "across";
    }, [state.wordsProperties, state.activePosition]);

    useEffect(() => {
        if (!data) return;
        dispatch({ type: CrosswordActionType.LOAD_SUCCESS, payload: data });
    }, [data]);

    useEffect(() => {
        inputRefs.current.length = state.rowsCount * state.colsCount;
    }, [state.rowsCount, state.colsCount]);

    const focusOnFirstCell = () => {
        const first = state.firstCellsOfWords[0];
        if (!first || state.colsCount === 0) return;

        const index = state.colsCount * (first.row - 1) + (first.col - 1);
        const el = inputRefs.current[index];
        if (el) {
            el.focus();
            dispatch({ type: CrosswordActionType.SELECT_NEW_CELL, newRow: first.row - 1, newCol: first.col - 1 });
        }
    }

    const handleCellKey = (
        rowIdx: number,
        colIdx: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const keyCode = e.key;
        const isLetter = /^[A-Za-zА-Яа-яЁё\- ]$/.test(keyCode);

        const focusTo = (startRow: number, startCol: number, dRow: number, dCol: number) => {
            const r = startRow + dRow;
            const c = startCol + dCol;
            if (r < 0 || c < 0 || r >= state.rowsCount || c >= state.colsCount) return;
            const target = state.cellsProperties[r]?.[c];
            if (!target || target.wordIndexes.length === 0) return; // не прыгаем через пустые
            const idx = state.colsCount * r + c;
            inputRefs.current[idx]?.focus();
            dispatch({ type: CrosswordActionType.SELECT_NEW_CELL, newRow: r, newCol: c });
        };

        const moveWithinWord = (delta: number) => {
            const wordCoords = state.wordsCoords[state.activePosition] ?? [];
            const currentIndex = wordCoords.findIndex(
                (p) => p.row === rowIdx + 1 && p.col === colIdx + 1
            );
            if (currentIndex === -1) return;
            const nextIndex = currentIndex + delta;
            const nextPoint = wordCoords[nextIndex];
            if (!nextPoint) return;
            const r = nextPoint.row - 1;
            const c = nextPoint.col - 1;
            const idx = state.colsCount * r + c;
            inputRefs.current[idx]?.focus();
            dispatch({ type: CrosswordActionType.SELECT_NEW_CELL, newRow: r, newCol: c });
            return { r, c };
        };

        if (isLetter) {
            shouldAutoAdvanceRef.current = true;
            dispatch({ type: CrosswordActionType.SET_CELL_VALUE, row: rowIdx, col: colIdx, value: e.key });
            moveWithinWord(1);
            e.preventDefault();
            return;
        }

        switch (keyCode) {
            case Keys.BACKSPACE: {
                const currentVal = state.cellsValues[rowIdx]?.[colIdx] ?? "";
                if (currentVal) {
                    dispatch({ type: CrosswordActionType.SET_CELL_VALUE, row: rowIdx, col: colIdx, value: "" });
                } else {
                    const prev = moveWithinWord(-1);
                    if (prev) {
                        dispatch({ type: CrosswordActionType.SET_CELL_VALUE, row: prev.r, col: prev.c, value: "" });
                    }
                }
                e.preventDefault();
                return;
            }
            case Keys.DELETE: {
                dispatch({ type: CrosswordActionType.SET_CELL_VALUE, row: rowIdx, col: colIdx, value: "" });
                e.preventDefault();
                return;
            }
            case Keys.LEFT_ARROW:
                shouldAutoAdvanceRef.current = false;
                focusTo(rowIdx, colIdx, 0, -1);
                e.preventDefault();
                return;
            case Keys.UP_ARROW:
                shouldAutoAdvanceRef.current = false;
                focusTo(rowIdx, colIdx, -1, 0);
                e.preventDefault();
                return;
            case Keys.RIGHT_ARROW:
                shouldAutoAdvanceRef.current = false;
                focusTo(rowIdx, colIdx, 0, 1);
                e.preventDefault();
                return;
            case Keys.DOWN_ARROW:
                shouldAutoAdvanceRef.current = false;
                focusTo(rowIdx, colIdx, 1, 0);
                e.preventDefault();
                return;
            default:
                break;
        }
    };

    const handleCellClick = (rowIdx: number, colIdx: number) => {
        shouldAutoAdvanceRef.current = false;
        const positions = state.cellsProperties[rowIdx]?.[colIdx]?.wordIndexes ?? [];
        dispatch({ type: CrosswordActionType.SET_ACTIVE_BY_CLICK, settings: { positions, mode: "click" } });
        const index = state.colsCount * rowIdx + colIdx;
        const el = inputRefs.current[index];
        if (el) el.focus();
    };

    const focusOnFirstCellAfterWordAdvance = () => {
        if (!shouldFocusFirstRef.current) return;
        const first = state.firstCellsOfWords[state.activePosition];
        if (!first) {
            shouldFocusFirstRef.current = false;
            return;
        }

        const index = state.colsCount * (first.row - 1) + (first.col - 1);
        const el = inputRefs.current[index];
        if (el) el.focus();
        shouldFocusFirstRef.current = false;
    };

    const advanceToNextWordAfterPreviousCompleted = () => {
        const current = state.definitionProperties[state.activePosition];
        if (!current) return;
        if (current.isDone && shouldAutoAdvanceRef.current) {
            shouldFocusFirstRef.current = true;
            dispatch({ type: CrosswordActionType.MOVE_TO_NEXT_WORD });
            shouldAutoAdvanceRef.current = false;
        }
    }

    useEffect(focusOnFirstCell, [state.firstCellsOfWords, state.colsCount]);
    useEffect(advanceToNextWordAfterPreviousCompleted, [state.definitionProperties, state.activePosition]);
    useEffect(focusOnFirstCellAfterWordAdvance, [state.activePosition, state.firstCellsOfWords, state.colsCount]);

    useEffect(() => {
        const defs = state.definitionProperties;
        const completed = defs.length > 0 && defs.every((d) => d.isDone);

        if (!completed || hasCompleted) return;

        setHasCompleted(true);

        const handleCompletion = async () => {
            try {
                setLoading(true);
                const sublevelInfo = await getSublevelInfo(sublevelId);

                if (!sublevelInfo) {
                    console.error("Sublevel not found");
                    return;
                }

                const result = await completeCrosswordSublevel(sublevelId);

                openModal("completion-phrase", {
                    phrase: sublevelInfo.phrasePart || "",
                    onClose: async () => {
                        try {
                            setLoading(true);

                            const levelInfo = await getLevelInfo(sublevelInfo.levelId);
                            const sublevels =  await getSublevelsInfo(sublevelInfo.levelId);
                            const phraseParts = sublevels.map((sublevel) => sublevel.phrasePart);

                            if (!result.hasNextSublevel) {
                                openModal("level-completion", {
                                    phrase: levelInfo.phrase,
                                    pieces: phraseParts
                                });
                            }
                        }
                        catch (error) {
                            console.error("Error completing crossword:", error);
                        } finally {
                            setLoading(false);
                        }
                    }
                });
            } catch (error) {
                console.error("Error completing crossword:", error);
            } finally {
                setLoading(false);
            }
        };

        handleCompletion();
    }, [state.definitionProperties, hasCompleted, sublevelId, openModal]);

    return (
        <div className={styles.crossword}>
            <h2 className={clsx(styles["crossword__title"], "title--h2", "text_m")}>
                Кроссворд
            </h2>

            <div className={styles["crossword__field"]}>
                <div className={styles["crossword__main"]}>
                    {Array.from({length: state.rowsCount}).map((_, rowIdx) => (
                        <div className={styles["crossword__row"]} key={rowIdx}>
                            {Array.from({length: state.colsCount}).map((_, colIdx) => {
                                const cell = state.cellsProperties[rowIdx]?.[colIdx];
                                const value = state.cellsValues[rowIdx]?.[colIdx] ?? "";
                                const refIndex = state.colsCount * rowIdx + colIdx;

                                return (
                                    <CrosswordCell
                                        key={`${colIdx},${rowIdx}`}
                                        inputRef={(el: HTMLInputElement | null) =>
                                            (inputRefs.current[refIndex] = el)
                                        }
                                        value={value}
                                        cell={cell}
                                        orientation={orientation}
                                        firstCellsOfWords={state.firstCellsOfWords}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                            handleCellKey(rowIdx, colIdx, e)
                                        }
                                        onClick={() => handleCellClick(rowIdx, colIdx)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles["crossword__definitions"]}>
                    {Array.from({length: state.wordsCount}).map((_, wordIdx) => (
                        <CrosswordDefinition
                            key={wordIdx}
                            definition={state.definitionProperties[wordIdx]}
                            onClick={(def) => {
                                openModal("definition", { definition: def });
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
