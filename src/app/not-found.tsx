"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import {Routes} from "@/app/routes";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-screen">
            <div className="text-8xl font-bold text-gray-300">404</div>

            <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>

            <div className="pt-6">
                <Button as={Link} href={Routes.Home} color="primary" variant="shadow">
                    Вернуться на главную
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
