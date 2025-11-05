
import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import Crossword from "@/app/components/crossword/crossword/crossword";

type Props = {
    params: Promise<{ levelId: string; sublevelId: string }>;
};

export default async function CrosswordPlayPage({ params }: Props) {
    const { sublevelId } = await params;
    const crossword = getInjection('ICrosswordController') as ICrosswordController;
    const data = await crossword.getCrosswordBySublevelId(sublevelId);

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <Crossword data={data.content} />
        </div>
    );
}


