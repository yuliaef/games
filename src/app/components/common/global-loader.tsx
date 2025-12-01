"use client";

import {useEffect} from "react";
import {useLoadingStore} from "@/app/store/loading.store";

export function GlobalLoader() {
    const isLoading = useLoadingStore((s) => s.isLoading);

    useEffect(() => {
        // Блокируем прокрутку body когда лоадер активен
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[1px] flex items-center justify-center"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="h-12 w-12 rounded-full border-4 border-white border-t-transparent animate-spin" />
        </div>
    );
}
