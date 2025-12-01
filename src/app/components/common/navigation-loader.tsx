"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadingStoreDirect } from "@/app/store/loading.store";

/**
 * Компонент для автоматического показа лоадера при переходах между страницами
 */
export function NavigationLoader() {
    const pathname = usePathname();
    const previousPathnameRef = useRef<string>(pathname);
    const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isNavigatingRef = useRef<boolean>(false);
    const pageLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Если pathname изменился, значит началась навигация
        if (previousPathnameRef.current !== pathname) {
            // Если мы были в процессе навигации, ждем полной загрузки страницы
            if (isNavigatingRef.current) {
                // Очищаем предыдущий таймаут
                if (pageLoadTimeoutRef.current) {
                    clearTimeout(pageLoadTimeoutRef.current);
                }

                // Ждем события load или используем таймаут как fallback
                const handleLoad = () => {
                    // Небольшая задержка для плавности после загрузки
                    pageLoadTimeoutRef.current = setTimeout(() => {
                        loadingStoreDirect.setState({ isLoading: false });
                        isNavigatingRef.current = false;
                        if (navigationTimeoutRef.current) {
                            clearTimeout(navigationTimeoutRef.current);
                            navigationTimeoutRef.current = null;
                        }
                    }, 150);
                };

                // Если страница уже загружена
                if (document.readyState === 'complete') {
                    handleLoad();
                } else {
                    window.addEventListener('load', handleLoad, { once: true });
                }

                previousPathnameRef.current = pathname;

                return () => {
                    window.removeEventListener('load', handleLoad);
                    if (pageLoadTimeoutRef.current) {
                        clearTimeout(pageLoadTimeoutRef.current);
                    }
                };
            } else {
                // Если навигация не была инициирована через наш компонент, просто обновляем ref
                previousPathnameRef.current = pathname;
            }
        }
    }, [pathname]);

    useEffect(() => {
        // Перехватываем клики на все Link компоненты и внутренние ссылки
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href]') as HTMLAnchorElement;
            
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Пропускаем внешние ссылки
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                return;
            }

            // Пропускаем якоря на той же странице
            if (href.startsWith('#')) {
                return;
            }

            // Пропускаем если это та же страница (без учета query параметров и hash)
            const currentPath = pathname.split('?')[0].split('#')[0];
            const targetPath = href.split('?')[0].split('#')[0];
            
            if (targetPath === currentPath) {
                return;
            }

            // Проверяем, что это внутренняя ссылка Next.js
            // Next.js Link компоненты имеют data-атрибуты или являются относительными путями
            const isNextLink = link.hasAttribute('data-nextjs-link') || 
                              href.startsWith('/') || 
                              !href.includes('://');

            if (isNextLink) {
                // Показываем лоадер при клике на внутреннюю ссылку
                isNavigatingRef.current = true;
                loadingStoreDirect.setState({ isLoading: true });

                // Таймаут на случай, если навигация не произошла
                if (navigationTimeoutRef.current) {
                    clearTimeout(navigationTimeoutRef.current);
                }
                navigationTimeoutRef.current = setTimeout(() => {
                    loadingStoreDirect.setState({ isLoading: false });
                    isNavigatingRef.current = false;
                }, 10000); // 10 секунд максимум
            }
        };

        // Перехватываем программную навигацию через history API
        const handlePopState = () => {
            isNavigatingRef.current = true;
            loadingStoreDirect.setState({ isLoading: true });
        };

        // Перехватываем pushState и replaceState
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function(...args) {
            const url = args[2] as string;
            if (url && url !== window.location.pathname) {
                isNavigatingRef.current = true;
                loadingStoreDirect.setState({ isLoading: true });
            }
            return originalPushState.apply(this, args);
        };

        history.replaceState = function(...args) {
            const url = args[2] as string;
            if (url && url !== window.location.pathname) {
                isNavigatingRef.current = true;
                loadingStoreDirect.setState({ isLoading: true });
            }
            return originalReplaceState.apply(this, args);
        };

        // Перехватываем клики на документе (capture phase для раннего перехвата)
        document.addEventListener('click', handleLinkClick, true);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleLinkClick, true);
            window.removeEventListener('popstate', handlePopState);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
            if (navigationTimeoutRef.current) {
                clearTimeout(navigationTimeoutRef.current);
            }
        };
    }, [pathname]);

    return null;
}

