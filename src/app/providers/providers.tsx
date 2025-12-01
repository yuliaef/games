"use client"

import {HeroUIProvider} from '@heroui/react'
import {SessionProvider} from "next-auth/react";
import {ModalProvider} from "@/app/components/modal/modal-provider";
import {NavigationLoader} from "@/app/components/common/navigation-loader";
// Импортируем модальные окна для регистрации
import "@/app/components/modal/modals/definition-modal";
import "@/app/components/modal/modals/completion-phrase-modal";
import "@/app/components/modal/modals/level-completion-modal";
import "@/app/components/modal/modals/level-finished-modal";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <SessionProvider>
                <NavigationLoader />
                {children}
                <ModalProvider />
            </SessionProvider>
        </HeroUIProvider>
    )
}
