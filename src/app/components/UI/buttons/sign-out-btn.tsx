"use client";

import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";
import {useLoadingStore} from "@/app/store/loading.store";
import {Routes} from "@/app/routes";
import {useRouter} from "next/navigation";

const SignOutBtn = () => {
    const setLoading = useLoadingStore((s) => s.setLoading);
    const router = useRouter();

    const handleSignOut = async () => {
        setLoading(true);

        try {
            await signOut();
            router.push(Routes.SignIn);
        } catch (error) {
            console.error("error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            color="primary"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold"
            onPress={handleSignOut}
        >
            Выйти
        </Button>
    );
};

export default SignOutBtn;
