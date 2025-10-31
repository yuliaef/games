import { ReactNode } from "react";
import Header from "@/app/components/UI/layout/header";
import { auth } from "@/app/auth/auth";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    const userName = session?.user?.name;

    return (
        <div>
            <Header userName={userName ?? undefined} />
            {children}
        </div>
    );
}


