"use client"

import {HeroUIProvider} from '@heroui/react'
import {SessionProvider} from "next-auth/react";
import {ModalProvider} from "@/app/components/modal/modal-provider";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <SessionProvider>
                {children}
                <ModalProvider />
            </SessionProvider>
        </HeroUIProvider>
    )
}
