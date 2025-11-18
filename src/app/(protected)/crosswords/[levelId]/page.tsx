import SubLevelsGrid from "@/app/components/crossword/sublevels-grid";
import Link from "next/link";
import {Routes} from "@/app/routes";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ levelId: number }>
};

export default async function CrosswordLevelPage({ params }: Props) {
    const { levelId: levelIdParam } = await params;
    const levelId = Number(levelIdParam);

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <Link
                href={`${Routes.Crosswords}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
                ← Назад к уровням
            </Link>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Подуровни</h1>
            </div>

            <SubLevelsGrid levelId={levelId} />
        </div>
    );
}


