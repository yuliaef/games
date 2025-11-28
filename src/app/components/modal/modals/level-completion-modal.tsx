import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import {registerModal} from "@/app/components/modal/modal-registry";

// Только корректная фраза и кусочки
type LevelCompletionModalData = {
    phrase: string;     // правильная целевая фраза
    pieces: string[];   // все кусочки для сборки (в любом порядке)
    onSolved?: () => Promise<void> | void;
};

type ModalContentProps<T> = {
    data: T;
    onClose: () => void;
};

export function LevelCompletionModalContent({
                                                 data,
                                                 onClose,
                                             }: ModalContentProps<LevelCompletionModalData>) {
    const { phrase, pieces } = data;

    // начальный порядок — как пришло в props (если нужно — можно перетасовать)
    const initial = useMemo(() => [...pieces], [pieces]);
    const [order, setOrder] = useState<string[]>(initial);
    const [isCorrect, setIsCorrect] = useState(false);
    const [checked, setChecked] = useState(false);
    const solvedRef = useRef(false);

    const handleSolved = useCallback(async () => {
        if (solvedRef.current) return;
        solvedRef.current = true;

        try {
            if (data.onSolved) {
                await data.onSolved();
            }
            onClose();
        } catch (error) {
            console.error("Failed to finalize level:", error);
            solvedRef.current = false;
        }
    }, [data.onSolved, onClose]);

    const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
        e.dataTransfer.setData("text/plain", String(idx));
        // небольшой стаб для Safari/Firefox
        if (e.dataTransfer.setDragImage) {
            const el = e.currentTarget.cloneNode(true) as HTMLElement;
            el.style.position = "absolute";
            el.style.top = "-9999px";
            document.body.appendChild(el);
            e.dataTransfer.setDragImage(el, 0, 0);
            setTimeout(() => document.body.removeChild(el), 0);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIdx: number) => {
        e.preventDefault();
        const dragIdx = Number(e.dataTransfer.getData("text/plain"));
        if (Number.isNaN(dragIdx) || dragIdx === dropIdx) return;

        setOrder((prev) => {
            const next = [...prev];
            const [moved] = next.splice(dragIdx, 1);
            next.splice(dropIdx, 0, moved);
            return next;
        });
        setChecked(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const checkAnswer = () => {
        const sentence = norm(order.join(" "));
        const expected = norm(phrase);
        const isMatch = sentence === expected;
        setIsCorrect(isMatch);
        setChecked(true);

        if (isMatch) {
            void handleSolved();
        }
    };

    const resetOrder = () => {
        setOrder(initial);
        setChecked(false);
        setIsCorrect(false);
    };

    return (
        <>
            <ModalHeader>
                <div>Уровень пройден!</div>
            </ModalHeader>

            <ModalBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {/* Блок «Ваш фрагмент фразы» */}
                    <div>
                        <div
                            style={{
                                fontWeight: 600,
                                marginBottom: "0.75rem",
                                fontSize: "0.875rem",
                                color: "var(--heroui-default-600, #71717a)",
                            }}
                        >
                            Ваш фрагмент фразы
                        </div>
                        <div
                            style={{
                                lineHeight: 1.6,
                                fontSize: "1.125rem",
                                fontWeight: 500,
                                color: "var(--heroui-default-900, #18181b)",
                            }}
                        >
                            {phrase}
                        </div>
                    </div>

                    {/* DnD упражнение */}
                    <div>
                        <div
                            style={{
                                fontWeight: 600,
                                marginBottom: "0.75rem",
                                fontSize: "0.875rem",
                                color: "var(--heroui-default-600, #71717a)",
                            }}
                        >
                            Соберите предложение
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                                padding: "0.75rem",
                                borderRadius: "0.75rem",
                                border: "1px solid var(--heroui-default-200, #e4e4e7)",
                                background:
                                    checked && isCorrect
                                        ? "rgba(34, 197, 94, 0.08)"
                                        : "var(--heroui-content1, #fff)",
                                transition: "background 0.2s ease",
                            }}
                            aria-live="polite"
                        >
                            {order.map((piece, idx) => (
                                <div
                                    key={`${piece}-${idx}`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    onDragOver={handleDragOver}
                                    role="button"
                                    tabIndex={0}
                                    style={{
                                        padding: "0.5rem 0.75rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid var(--heroui-default-300, #d4d4d8)",
                                        cursor: "grab",
                                        userSelect: "none",
                                        fontSize: "0.95rem",
                                        background: "#fafafa",
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "ArrowLeft" && idx > 0) {
                                            setOrder((prev) => {
                                                const next = [...prev];
                                                const [m] = next.splice(idx, 1);
                                                next.splice(idx - 1, 0, m);
                                                return next;
                                            });
                                            setChecked(false);
                                        } else if (e.key === "ArrowRight" && idx < order.length - 1) {
                                            setOrder((prev) => {
                                                const next = [...prev];
                                                const [m] = next.splice(idx, 1);
                                                next.splice(idx + 1, 0, m);
                                                return next;
                                            });
                                            setChecked(false);
                                        }
                                    }}
                                >
                                    {piece}
                                </div>
                            ))}
                        </div>

                        {/* Кнопки проверки/сброса + результат */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                marginTop: "0.75rem",
                            }}
                        >
                            <Button color="primary" onPress={checkAnswer}>
                                Проверить
                            </Button>
                            <Button variant="flat" onPress={resetOrder}>
                                Сбросить
                            </Button>

                            {checked && (
                                <div
                                    style={{
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        marginLeft: "0.25rem",
                                        color: isCorrect ? "#16a34a" : "#ef4444",
                                    }}
                                >
                                    {isCorrect ? "Верно!" : "Попробуйте ещё раз"}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onPress={onClose}>
                    Ок
                </Button>
            </ModalFooter>
        </>
    );
}

registerModal<LevelCompletionModalData>("level-completion", LevelCompletionModalContent);

