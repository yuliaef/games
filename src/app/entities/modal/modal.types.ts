export type ModalData<T = any> = T;

export type ModalId = string;

export type ModalType = string;

export interface ModalConfig<T = any> {
    id: ModalId;
    type: ModalType;
    data: ModalData<T>;
    closeOnOverlay?: boolean;
    closeOnEscape?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ModalState<T = any> extends ModalConfig<T> {
    isOpen: boolean;
}

