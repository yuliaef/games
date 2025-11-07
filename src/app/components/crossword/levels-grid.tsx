import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import Link from "next/link";
import {Routes} from "@/app/routes";
import { getLevelImageUrl } from "@/app/utils/image-urls";

export default async function LevelsGrid() {
    const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
    const levels = await crosswordController.listLevels();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {levels.map((level) => (
                <Link
                    key={level.id}
                    href={`${Routes.Crosswords}/${level.id}`}
                    className="p-4 border rounded-md shadow-sm bg-white hover:bg-slate-50 transition overflow-hidden"
                >
                    <div className="relative w-full aspect-square mb-3 rounded-md overflow-hidden bg-slate-100">
                        <img
                            src={getLevelImageUrl(level.id)}
                            alt={`Превью уровня: ${level.name}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{level.name}</h2>
                        {level.completed ? (
                            <span className="text-green-600 text-sm">Пройден</span>
                        ) : (
                            <span className="text-slate-500 text-sm">Не пройден</span>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
