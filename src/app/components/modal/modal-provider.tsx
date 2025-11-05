"use client";

import { useModalStore } from "@/app/store/modal.store";
import { ModalComponent } from "./modal";
import { getModalComponent } from "./modal-registry";
import { useEffect, useRef } from "react";

export function ModalProvider() {
    const modals = useModalStore((state) => state.modals);
    const { closeModal } = useModalStore();
    const processedModalsRef = useRef<Set<string>>(new Set());

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

