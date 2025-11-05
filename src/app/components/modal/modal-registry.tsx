"use client";

import { ComponentType } from "react";
import { ModalType, ModalData } from "@/app/entities/modal/modal.types";
import {ConfirmModalContent} from "@/app/components/modal/modals/confirm-modal";
import {DefinitionModalContent} from "@/app/components/modal/modals/definition-modal";

export interface ModalContentProps<T = any> {
    data: ModalData<T>;
    onClose: () => void;
}

export type ModalContentComponent<T = any> = ComponentType<ModalContentProps<T>>;

export const modalRegistry: Partial<Record<ModalType, ModalContentComponent>> = {
    'confirm': ConfirmModalContent,
    'definition': DefinitionModalContent
};

export function registerModal<T = any>(type: ModalType, component: ModalContentComponent<T>) {
    modalRegistry[type] = component as ModalContentComponent;
}

export function getModalComponent(type: ModalType): ModalContentComponent | undefined {
    return modalRegistry[type];
}

