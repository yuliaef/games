import {
    computeFirstCells,
    computeWordsCoords,
    createCellsProperties,
    createCellsValues,
    createDefinitions, getActiveWordValue, setActiveForWord, validateActiveWord
} from "@/app/utils/crossword/crossword-utils";
import {CrosswordState} from "@/app/entities/crossword/state";
import {CrosswordAction} from "@/app/entities/crossword/actions";

export function crosswordReducer(state: CrosswordState, action: CrosswordAction): CrosswordState {
    switch (action.type) {
        case "LOAD_START":
            return { ...state, isLoading: true, hasLoadingError: false };
        case "LOAD_SUCCESS": {
            const words = action.payload.words;
            const wordsCount = words.length;
            const { coords, rows, cols } = computeWordsCoords(words);
            const cellsValues = createCellsValues(rows, cols);
            const cellsProperties = createCellsProperties(rows, cols, coords);
            const definitionProperties = createDefinitions(words);
            const firstCellsOfWords = computeFirstCells(coords);
            const next: CrosswordState = {
                ...state,
                wordsProperties: words,
                wordsCount,
                wordsCoords: coords,
                rowsCount: rows,
                colsCount: cols,
                cellsValues,
                cellsProperties,
                definitionProperties,
                firstCellsOfWords,
                activePosition: 0,
                isLoading: false,
                hasLoadingError: false,
            };
            setActiveForWord(next, next.activePosition);
            return next;
        }
        case "LOAD_ERROR":
            return { ...state, isLoading: false, hasLoadingError: true };
        case "SET_CELL_VALUE": {
            const { row, col, value } = action;
            const next = { ...state };
            next.cellsValues = state.cellsValues.map((r, ri) =>
                r.map((c, ci) => (ri === row && ci === col ? value : c))
            );
            // validate immediately after input so we don't require extra key presses
            const current = getActiveWordValue(next);
            validateActiveWord(next, current);
            return next;
        }
        case "SELECT_NEW_CELL": {
            const next = { ...state };
            const row = action.newRow;
            const col = action.newCol;
            const cell = state.cellsProperties[row]?.[col];
            
            if (cell && cell.wordIndexes.length > 0) {
                // Если клетка принадлежит только одному слову, активируем его
                if (cell.wordIndexes.length === 1) {
                    next.activePosition = cell.wordIndexes[0];
                } else {
                    // Если клетка принадлежит нескольким словам, выбираем первое доступное
                    // или оставляем текущее активное слово, если оно тоже присутствует в этой клетке
                    const currentWordInCell = cell.wordIndexes.includes(state.activePosition);
                    if (currentWordInCell) {
                        // Оставляем текущее активное слово
                        next.activePosition = state.activePosition;
                    } else {
                        // Выбираем первое слово из доступных
                        next.activePosition = cell.wordIndexes[0];
                    }
                }
            }
            setActiveForWord(next, next.activePosition);
            const value = getActiveWordValue(next);
            validateActiveWord(next, value);
            return next;
        }
        case "SET_ACTIVE_BY_CLICK": {
            const next = { ...state };
            const { positions, mode, row, col } = action.settings;
            
            let chosen: number | undefined;
            
            // Если переданы координаты клетки, проверяем, является ли она первой клеткой какого-то слова
            if (row !== undefined && col !== undefined) {
                // Ищем слово, которое начинается с этой клетки
                const wordIndexStartingHere = next.firstCellsOfWords.findIndex(
                    (firstCell) => firstCell.row === row && firstCell.col === col
                );
                
                if (wordIndexStartingHere !== -1 && positions.includes(wordIndexStartingHere)) {
                    // Если эта клетка является первой клеткой слова, выбираем это слово
                    chosen = wordIndexStartingHere;
                }
            }
            
            // Если не нашли слово, начинающееся с этой клетки, используем старую логику
            if (chosen === undefined) {
                const [first, second] = positions;
                // При клике выбираем первое слово (а не второе)
                chosen = first;
            }
            
            if (chosen !== undefined) next.activePosition = chosen;
            setActiveForWord(next, next.activePosition);
            if (mode === "keyboard") {
                const value = getActiveWordValue(next);
                validateActiveWord(next, value);
            }
            return next;
        }
        case "MOVE_TO_NEXT_WORD": {
            const next = { ...state };
            if (next.activePosition < next.wordsCount - 1) {
                next.activePosition = next.activePosition + 1;
            }
            setActiveForWord(next, next.activePosition);
            return next;
        }
        default:
            return state;
    }
}
