import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import Link from "next/link";
import {Routes} from "@/app/routes";

export default async function SubLevelsGrid({ levelId }: { levelId: number }) {
    const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
    const sublevels = await crosswordController.listSublevels(levelId);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sublevels.map((sub) => (
                <Link
                    key={sub.id}
                    href={`${Routes.Crosswords}/${levelId}/${sub.id}`}
                    className="p-4 border rounded-md shadow-sm bg-white hover:bg-slate-50 transition"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">{sub.name}</h3>
                        {sub.locked ? (
                            <span className="text-slate-400 text-xs">Заблокирован</span>
                        ) : sub.completed ? (
                            <span className="text-green-600 text-xs">Пройден</span>
                        ) : (
                            <span className="text-slate-500 text-xs">Не пройден</span>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
