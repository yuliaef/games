import LevelsGrid from "@/app/components/crossword/levels-grid";

export default function HomePage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Кроссворды</h1>
            </div>

            <LevelsGrid/>
        </div>
    );
}
