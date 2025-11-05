import { create } from "zustand";
import { ModalId, ModalType, ModalData, ModalConfig, ModalState } from "@/app/entities/modal/modal.types";

interface ModalStore {
    modals: ModalState[];
    openModal: <T>(type: ModalType, data: ModalData<T>, config?: Partial<ModalConfig<T>>) => ModalId;
    closeModal: (id: ModalId) => void;
    closeAllModals: () => void;
    closeLastModal: () => void;
    getModal: (id: ModalId) => ModalState | undefined;
}

const generateModalId = (): ModalId => {
    return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useModalStore = create<ModalStore>((set, get) => ({
    modals: [],
    openModal: (type, data, config = {}) => {
        const id = config.id || generateModalId();
        const newModal: ModalState = {
            id,
            type,
            data,
            isOpen: true,
            closeOnOverlay: config.closeOnOverlay !== undefined ? config.closeOnOverlay : true,
            closeOnEscape: config.closeOnEscape !== undefined ? config.closeOnEscape : true,
            size: config.size || 'md',
        };

        set((state) => ({
            modals: [...state.modals, newModal],
        }));

        return id;
    },
    closeModal: (id) => {
        set((state) => ({
            modals: state.modals.filter((modal) => modal.id !== id),
        }));
    },
    closeAllModals: () => {
        set({ modals: [] });
    },
    closeLastModal: () => {
        set((state) => {
            if (state.modals.length === 0) return state;
            const newModals = [...state.modals];
            newModals.pop();
            return { modals: newModals };
        });
    },
    getModal: (id) => {
        return get().modals.find((modal) => modal.id === id);
    },
}));

