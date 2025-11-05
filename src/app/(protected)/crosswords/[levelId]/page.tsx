import SubLevelsGrid from "@/app/components/crossword/sublevels-grid";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ levelId: string }>
};

export default async function CrosswordLevelPage({ params }: Props) {
    const { levelId } = await params;

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Подуровни</h1>
            </div>

            <SubLevelsGrid levelId={levelId} />
        </div>
    );
}


