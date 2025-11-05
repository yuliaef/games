
import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import Crossword from "@/app/components/crossword/crossword/crossword";

type Props = {
    params: Promise<{ levelId: number; sublevelId: number }>;
};

export default async function CrosswordPlayPage({ params }: Props) {
    const { sublevelId: levelIdParam } = await params;
    const sublevelId = Number(levelIdParam);
    const crossword = getInjection('ICrosswordController') as ICrosswordController;
    const data = await crossword.getCrosswordBySublevelId(sublevelId);

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <Crossword data={data.content} sublevelId={sublevelId} />
        </div>
    );
}


