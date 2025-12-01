"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { ModalContentProps } from "../modal-registry";

export interface ConfirmModalData {
    title: string;
    message?: string;
    content?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmModalContent({ data, onClose }: ModalContentProps) {
    const confirmData = data as ConfirmModalData;

    const handleConfirm = () => {
        confirmData.onConfirm?.();
        onClose();
    };

    const handleCancel = () => {
        confirmData.onCancel?.();
        onClose();
    };

    const message = confirmData.message || confirmData.content || "";

    return (
        <>
            <ModalHeader>{confirmData.title}</ModalHeader>
            {message && <ModalBody>{message}</ModalBody>}
            <ModalFooter>
                <Button variant="light" onPress={handleCancel}>
                    {confirmData.cancelText || "Отмена"}
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                    {confirmData.confirmText || "Подтвердить"}
                </Button>
            </ModalFooter>
        </>
    );
}
