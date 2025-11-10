"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { registerModal, ModalContentProps } from "../modal-registry";

export interface CompletionPhraseModalData {
    phrase: string;
    onClose: () => void
}

export function CompletionPhraseModalContent({ data, onClose }: ModalContentProps<CompletionPhraseModalData>) {
    return (
        <>
            <ModalHeader>
                <div>Уровень пройден!</div>
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
                            Ваш фрагмент фразы
                        </div>
                        <div style={{
                            lineHeight: "1.6",
                            fontSize: "1.125rem",
                            fontWeight: "500",
                            color: "var(--heroui-default-900, #18181b)"
                        }}>
                            {data.phrase}
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onPress={() => {
                    data.onClose();
                    onClose();
                }}>
                    Ок
                </Button>
            </ModalFooter>
        </>
    );
}

registerModal<CompletionPhraseModalData>("completion-phrase", CompletionPhraseModalContent);

