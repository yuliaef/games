"use client";

import { useModalStore } from "@/app/store/modal.store";
import { ModalComponent } from "./modal";
import { getModalComponent } from "./modal-registry";
import { useEffect, useRef } from "react";

export function ModalProvider() {
    const modals = useModalStore((state) => state.modals);
    const { closeModal } = useModalStore();
    const processedModalsRef = useRef<Set<string>>(new Set());

    // Блокируем прокрутку body и html когда есть открытые модальные окна
    useEffect(() => {
        const hasOpenModals = modals.some((modal) => modal.isOpen);
        
        if (hasOpenModals) {
            // Сохраняем текущую позицию прокрутки
            const scrollY = window.scrollY;
            // Блокируем прокрутку для html и body
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.position = "relative";
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.height = "100%";
        } else {
            // Восстанавливаем прокрутку
            const scrollY = document.body.style.top;
            document.documentElement.style.overflow = "";
            document.documentElement.style.position = "";
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.height = "";
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
        }

        return () => {
            // Очистка при размонтировании
            if (!modals.some((modal) => modal.isOpen)) {
                document.documentElement.style.overflow = "";
                document.documentElement.style.position = "";
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                document.body.style.height = "";
            }
        };
    }, [modals]);

    useEffect(() => {
        modals.forEach((modal) => {
            if (processedModalsRef.current.has(modal.id)) {
                return;
            }

            const ContentComponent = getModalComponent(modal.type);

            if (!ContentComponent) {
                console.warn(`Modal component for type "${modal.type}" is not registered. Closing modal.`);
                closeModal(modal.id);
                return;
            }

            processedModalsRef.current.add(modal.id);
        });

        const currentModalIds = new Set(modals.map((m) => m.id));
        processedModalsRef.current.forEach((id) => {
            if (!currentModalIds.has(id)) {
                processedModalsRef.current.delete(id);
            }
        });
    }, [modals, closeModal]);

    return (
        <>
            {modals.map((modal) => {
                const ContentComponent = getModalComponent(modal.type);

                if (!ContentComponent) {
                    return null;
                }

                return (
                    <ModalComponent key={modal.id} modal={modal}>
                        <ContentComponent
                            data={modal.data}
                            onClose={() => closeModal(modal.id)}
                        />
                    </ModalComponent>
                );
            })}
        </>
    );
}

