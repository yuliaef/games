"use client";

import { ReactNode } from "react";
import { ModalType, ModalData } from "@/app/entities/modal/modal.types";
import {ConfirmModalContent} from "@/app/components/modal/modals/confirm-modal";

export type ModalContentComponent<T = any> = (props: { data: ModalData<T>; onClose: () => void }) => ReactNode;

export const modalRegistry: Partial<Record<ModalType, ModalContentComponent>> = {
    'confirm': ConfirmModalContent,
};

export function registerModal<T = any>(type: ModalType, component: ModalContentComponent<T>) {
    modalRegistry[type] = component as ModalContentComponent;
}

export function getModalComponent(type: ModalType): ModalContentComponent | undefined {
    return modalRegistry[type];
}

