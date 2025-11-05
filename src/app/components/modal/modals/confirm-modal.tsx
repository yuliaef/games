"use client";

import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";

export interface ConfirmModalData {
    title: string;
    message?: string;
    content?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmModalContent({ data, onClose }: { data: ConfirmModalData; onClose: () => void }) {
    const handleConfirm = () => {
        data.onConfirm?.();
        onClose();
    };

    const handleCancel = () => {
        data.onCancel?.();
        onClose();
    };

    const message = data.message || data.content || "";

    return (
        <>
            <ModalHeader>{data.title}</ModalHeader>
            {message && <ModalBody>{message}</ModalBody>}
            <ModalFooter>
                <Button variant="light" onPress={handleCancel}>
                    {data.cancelText || "Отмена"}
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                    {data.confirmText || "Подтвердить"}
                </Button>
            </ModalFooter>
        </>
    );
}
