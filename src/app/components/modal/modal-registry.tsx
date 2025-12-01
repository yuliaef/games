"use client";

import { ComponentType } from "react";
import { ModalType, ModalData } from "@/app/entities/modal/modal.types";
import {ConfirmModalContent} from "@/app/components/modal/modals/confirm-modal";
import {DefinitionModalContent} from "@/app/components/modal/modals/definition-modal";

export interface ModalContentProps<T = unknown> {
    data: ModalData<T>;
    onClose: () => void;
}

export type ModalContentComponent<T = unknown> = ComponentType<ModalContentProps<T>>;

export const modalRegistry: Partial<Record<ModalType, ModalContentComponent<unknown>>> = {
    'confirm': ConfirmModalContent,
    'definition': DefinitionModalContent
};

export function registerModal<T = unknown>(type: ModalType, component: ModalContentComponent<T>) {
    modalRegistry[type] = component as ModalContentComponent<unknown>;
}

export function getModalComponent(type: ModalType): ModalContentComponent<unknown> | undefined {
    return modalRegistry[type];
}

