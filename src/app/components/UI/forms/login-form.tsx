"use client";

import {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {Form} from "@heroui/form";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import { signIn } from "next-auth/react";
import {Routes} from "@/app/routes";
import {useLoadingStore} from "@/app/store/loading.store";

interface LoginForm {
    username: string;
    password: string;
}

const initialForm: LoginForm = {
    username: '',
    password: ''
}

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginForm>(initialForm);
    const [error, setError] = useState('');
    const router = useRouter();
    const setLoading = useLoadingStore((s) => s.setLoading);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                username: formData.username,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Неверный логин или пароль");
                setLoading(false);
                return;
            }

            router.push(Routes.Home);
        } catch {
            setError("Ошибка сети. Попробуйте ещё раз.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData((s) => ({...s, username: e.target.value}))}
                    classNames={{
                        inputWrapper: "bg-default-100",
                        input: "text-sm focus:outline-none "
                    }}
                />
                <Input
                    isRequired
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData((s) => ({...s, password: e.target.value}))}
                    classNames={{
                        inputWrapper: "bg-default-100",
                        input: "text-sm focus:outline-none "
                    }}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" variant="bordered">Войти</Button>
            </Form>
        </div>
    );
};

export {LoginForm};
