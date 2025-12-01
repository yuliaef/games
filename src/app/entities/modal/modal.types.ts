export type ModalData<T = unknown> = T;

export type ModalId = string;

export type ModalType = string;

export interface ModalConfig<T = unknown> {
    id: ModalId;
    type: ModalType;
    data: ModalData<T>;
    closeOnOverlay?: boolean;
    closeOnEscape?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ModalState<T = unknown> extends ModalConfig<T> {
    isOpen: boolean;
}

