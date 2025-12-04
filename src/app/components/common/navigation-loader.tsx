"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadingStoreDirect } from "@/app/store/loading.store";

/**
 * Компонент для автоматического показа лоадера при переходах между страницами
 * Лоадер выключается сразу после изменения pathname, без таймаутов
 */
export function NavigationLoader() {
    const pathname = usePathname();
    const previousPathnameRef = useRef<string>(pathname);

    useEffect(() => {
        // Перехватываем клики на все Link компоненты и внутренние ссылки
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href]') as HTMLAnchorElement;

            if (!link) return;

            // Если ссылка помечена как "заблокированная" / disabled – полностью блокируем навигацию
            if (link.getAttribute('data-disabled') === 'true' || link.getAttribute('aria-disabled') === 'true') {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

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

            // Внутренняя навигация – включаем лоадер
            loadingStoreDirect.setState({ isLoading: true });
        };

        // Перехватываем программную навигацию через history API (назад/вперед)
        const handlePopState = () => {
            loadingStoreDirect.setState({ isLoading: true });
        };

        // Перехватываем клики на документе (capture phase для раннего перехвата)
        document.addEventListener('click', handleLinkClick, true);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleLinkClick, true);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [pathname]);

    // Когда pathname изменился – это завершение перехода, выключаем лоадер сразу
    useEffect(() => {
        if (previousPathnameRef.current !== pathname) {
            previousPathnameRef.current = pathname;
            // Выключаем лоадер сразу после перехода, без таймаутов
            loadingStoreDirect.setState({ isLoading: false });
        }
    }, [pathname]);

    return null;
}

