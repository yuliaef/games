"use client";

import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/app/store/loading.store";
import { useRef } from "react";

/**
 * Хук для навигации с автоматическим показом лоадера
 */
export function useNavigation() {
    const router = useRouter();
    const setLoading = useLoadingStore((s) => s.setLoading);
    const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const navigate = (url: string, options?: { replace?: boolean }) => {
        // Показываем лоадер
        setLoading(true);

        // Таймаут на случай, если навигация не произошла
        if (navigationTimeoutRef.current) {
            clearTimeout(navigationTimeoutRef.current);
        }
        navigationTimeoutRef.current = setTimeout(() => {
            setLoading(false);
        }, 10000); // 10 секунд максимум

        // Выполняем навигацию
        if (options?.replace) {
            router.replace(url);
        } else {
            router.push(url);
        }
    };

    return {
        push: (url: string) => navigate(url, { replace: false }),
        replace: (url: string) => navigate(url, { replace: true }),
        back: router.back,
        forward: router.forward,
        refresh: router.refresh,
    };
}

