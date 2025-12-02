"use client";

import { useRouter } from "next/navigation";

export function useNavigation() {
    const router = useRouter();

    return {
        push: (url: string) => router.push(url),
        replace: (url: string) => router.replace(url),
        back: router.back,
        forward: router.forward,
        refresh: router.refresh,
    };
}

