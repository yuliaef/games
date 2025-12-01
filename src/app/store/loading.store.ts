import { create } from "zustand";

type LoadingState = {
    isLoading: boolean;
    setLoading: (v: boolean) => void;
};

const loadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    setLoading: (v: boolean) => {
        set({ isLoading: v });
    },
}));

export const useLoadingStore = loadingStore;

// Прямой доступ к store для использования вне React компонентов
export const loadingStoreDirect = {
    getState: loadingStore.getState,
    setState: loadingStore.setState,
    subscribe: loadingStore.subscribe,
};
