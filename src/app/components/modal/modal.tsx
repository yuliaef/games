"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { ModalState } from "@/app/entities/modal/modal.types";
import { useModalStore } from "@/app/store/modal.store";
import { ReactNode, useEffect } from "react";

interface ModalComponentProps {
    modal: ModalState;
    children: ReactNode;
}

export function ModalComponent({ modal, children }: ModalComponentProps) {
    const { closeModal } = useModalStore();

    const handleClose = () => {
        closeModal(modal.id);
    };

    // Предотвращаем прокрутку на backdrop
    useEffect(() => {
        if (!modal.isOpen) return;

        // Блокируем прокрутку колесиком мыши везде, кроме ModalContent
        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;
            // Проверяем, находится ли элемент внутри ModalContent
            let element: HTMLElement | null = target;
            let isInsideModalContent = false;

            while (element && element !== document.body) {
                // Проверяем различные селекторы для ModalContent
                if (
                    element.classList.toString().includes('ModalContent') ||
                    element.getAttribute('data-slot') === 'content' ||
                    element.classList.toString().includes('overflow-y-auto')
                ) {
                    isInsideModalContent = true;
                    break;
                }
                element = element.parentElement;
            }

            if (!isInsideModalContent) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // Блокируем прокрутку касанием (для мобильных) везде, кроме ModalContent
        const handleTouchMove = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            // Проверяем, находится ли элемент внутри ModalContent
            let element: HTMLElement | null = target;
            let isInsideModalContent = false;

            while (element && element !== document.body) {
                // Проверяем различные селекторы для ModalContent
                if (
                    element.classList.toString().includes('ModalContent') ||
                    element.getAttribute('data-slot') === 'content' ||
                    element.classList.toString().includes('overflow-y-auto')
                ) {
                    isInsideModalContent = true;
                    break;
                }
                element = element.parentElement;
            }

            if (!isInsideModalContent) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        document.addEventListener("wheel", handleWheel, { passive: false });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, [modal.isOpen]);

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
            scrollBehavior="inside"
            placement="center"
            classNames={{
                base: "max-h-[90vh] mx-auto my-auto",
                wrapper: "items-center justify-center overflow-hidden",
                backdrop: "overflow-hidden touch-none",
            }}
        >
            <ModalContent className="max-h-[90vh] overflow-y-auto">
                {children}
            </ModalContent>
        </Modal>
    );
}

