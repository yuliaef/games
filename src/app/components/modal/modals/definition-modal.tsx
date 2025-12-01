"use client";
/* eslint-disable @next/next/no-img-element */

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { ModalContentProps } from "../modal-registry";
import { Definition } from "@/app/entities/crossword/definition";
import { useState } from "react";

export interface DefinitionModalData {
    definition: Definition;
}

export function DefinitionModalContent({ data, onClose }: ModalContentProps) {
    const { definition } = data as DefinitionModalData;
    const [isHintOpen, setIsHintOpen] = useState(false);

    const handleToggleHint = () => {
        setIsHintOpen((prev) => !prev);
    };

    return (
        <>
            <ModalHeader>
                <div>
                    {definition.number}. {definition.clue}
                </div>
            </ModalHeader>
            <ModalBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        <div style={{
                            fontWeight: "600",
                            marginBottom: "0.75rem",
                            fontSize: "0.875rem",
                            color: "var(--heroui-default-600, #71717a)"
                        }}>
                            Описание
                        </div>
                        <div style={{ lineHeight: "1.6" }}>{definition.description}</div>
                    </div>

                    {definition.imageUrl && (
                        <div>
                            <div style={{
                                fontWeight: "600",
                                marginBottom: "0.75rem",
                                fontSize: "0.875rem",
                                color: "var(--heroui-default-600, #71717a)"
                            }}>
                                Картинка
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    borderRadius: "0.5rem",
                                    overflow: "hidden",
                                    border: "1px solid var(--heroui-default-200, #e4e4e7)",
                                }}
                            >
                                <img
                                    src={definition.imageUrl}
                                    alt="Иллюстрация"
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    )}

                    {definition.hint && (
                        <div>
                            <button
                                onClick={handleToggleHint}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "0.5rem 0",
                                    fontWeight: "600",
                                    width: "100%",
                                    textAlign: "left",
                                    fontSize: "0.875rem",
                                    color: "var(--heroui-default-600, #71717a)",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--heroui-primary, #006FEE)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--heroui-default-600, #71717a)";
                                }}
                                aria-expanded={isHintOpen}
                            >
                                Подсказка
                                <span
                                    style={{
                                        transform: isHintOpen ? "rotate(90deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s",
                                        display: "inline-block",
                                    }}
                                >
                                    ▸
                                </span>
                            </button>
                            {isHintOpen && (
                                <div style={{
                                    paddingLeft: "1rem",
                                    marginTop: "0.5rem",
                                    lineHeight: "1.6",
                                    color: "var(--heroui-default-700, #3f3f46)"
                                }}>
                                    {definition.hint}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onPress={onClose}>
                    Закрыть
                </Button>
            </ModalFooter>
        </>
    );
}
