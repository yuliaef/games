"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import { LogoImage } from "@/app/components/common/logo-image";
import { Routes } from "@/app/routes";
import SignOutBtn from "@/app/components/UI/buttons/sign-out-btn";

type HeaderProps = {
    userName?: string;
};

const Header = ({ userName }: HeaderProps) => {
    return (
        <Navbar
            maxWidth="full"
            className="px-8 py-3 bg-white shadow-md border-b border-slate-200"
        >
            <NavbarBrand>
                <Link
                    href={Routes.Home}
                    className="flex items-center gap-2 text-[1.25rem] font-bold tracking-tight text-slate-700 hover:text-slate-500 transition-colors"
                >
                    <LogoImage size={36} priority />
                    <span>Лехины игрухи</span>
                </Link>
            </NavbarBrand>

            <NavbarContent
                justify="center"
                className="hidden sm:flex gap-6 text-[1rem] font-medium"
            >
                <NavbarItem>
                    <Link
                        href={Routes.Crosswords}
                        className="text-slate-600 hover:text-slate-400 transition-colors"
                    >
                        Кроссворды
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    {userName && (
                        <span className="mr-3 text-slate-700">{userName}</span>
                    )}
                    <SignOutBtn></SignOutBtn>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
