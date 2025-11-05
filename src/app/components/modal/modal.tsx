"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { ModalState } from "@/app/entities/modal/modal.types";
import { useModalStore } from "@/app/store/modal.store";
import { ReactNode } from "react";

interface ModalComponentProps {
    modal: ModalState;
    children: ReactNode;
}

export function ModalComponent({ modal, children }: ModalComponentProps) {
    const { closeModal } = useModalStore();

    const handleClose = () => {
        closeModal(modal.id);
    };

    const sizeMap = {
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        full: "full",
    } as const;

    return (
        <Modal
            isOpen={modal.isOpen}
            onClose={handleClose}
            size={sizeMap[modal.size || "md"]}
            closeButton={true}
            hideCloseButton={false}
            isDismissable={modal.closeOnOverlay !== false}
            isKeyboardDismissDisabled={modal.closeOnEscape === false}
        >
            <ModalContent>
                {children}
            </ModalContent>
        </Modal>
    );
}

