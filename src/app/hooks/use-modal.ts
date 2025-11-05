import { useModalStore } from "@/app/store/modal.store";
import { ModalType, ModalData, ModalConfig } from "@/app/entities/modal/modal.types";

export function useModal() {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const closeAllModals = useModalStore((state) => state.closeAllModals);
    const closeLastModal = useModalStore((state) => state.closeLastModal);
    const getModal = useModalStore((state) => state.getModal);
    const modals = useModalStore((state) => state.modals);

    return {
        openModal: <T>(
            type: ModalType,
            data: ModalData<T>,
            config?: Partial<ModalConfig<T>>
        ) => openModal<T>(type, data, config),
        closeModal,
        closeAllModals,
        closeLastModal,
        getModal,
        modals,
    };
}

