
import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import Crossword from "@/app/components/crossword/crossword/crossword";
import {Routes} from "@/app/routes";
import Link from "next/link";

type Props = {
    params: Promise<{ levelId: number; sublevelId: number }>;
};

export default async function CrosswordPlayPage({ params }: Props) {
    const { levelId, sublevelId: levelIdParam } = await params;
    const sublevelId = Number(levelIdParam);
    const crossword = getInjection('ICrosswordController') as ICrosswordController;
    const data = await crossword.getCrosswordBySublevelId(sublevelId);

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <Link
                href={`${Routes.Crosswords}/${levelId}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
                ← Назад к подуровням
            </Link>

            <Crossword data={data.content} sublevelId={sublevelId} />
        </div>
    );
}


