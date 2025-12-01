import { LogoImage } from "@/app/components/common/logo-image";

export default function HomePage() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
            <h1 className="text-3xl font-bold text-slate-800">Bienvenido!</h1>
            <LogoImage size={120} priority/>
        </main>
    );
}
