"use client";

import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {useLoadingStore} from "@/app/store/loading.store";

export function GlobalLoader() {
    const pathname = usePathname();
    const isLoading = useLoadingStore((s) => s.isLoading);
    const setLoading = useLoadingStore((s) => s.setLoading);
    const isLoadingRef = useRef(isLoading);

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    useEffect(() => {
        if (isLoadingRef.current) {
            setLoading(false);
        }
    }, [pathname, setLoading]);

    if (!isLoading) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[1px] flex items-center justify-center"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="h-12 w-12 rounded-full border-4 border-white border-t-transparent animate-spin" />
            {/* TODO */}
            <style>{`body { overflow: hidden; }`}</style>
        </div>
    );
}
