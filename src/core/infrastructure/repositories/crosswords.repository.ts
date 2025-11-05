import prisma from "@/utils/prisma";
import { CrosswordLevel, CrosswordSublevel } from "@/generated/prisma";
import {
    CrosswordWithTypedContent,
    ICrosswordsRepository
} from "@/core/application/interfaces/repositories/crosswords.repository.interface";

export class CrosswordsRepository implements ICrosswordsRepository {
    async listLevels(): Promise<CrosswordLevel[]> {
        try {
            return prisma.crosswordLevel.findMany({
                orderBy: { createdAt: "asc" },
                include: { sublevels: false },
            }) as unknown as CrosswordLevel[];
        } catch (err) {
            throw err;
        }
    }

    async listSublevels(levelId: number): Promise<CrosswordSublevel[]> {
        try {
            return prisma.crosswordSublevel.findMany({
                where: { levelId },
                orderBy: { createdAt: "asc" },
            }) as unknown as CrosswordSublevel[];
        } catch (err) {
            throw err;
        }
    }

    async getSublevelById(sublevelId: number): Promise<CrosswordSublevel | null> {
        try {
            return prisma.crosswordSublevel.findUnique({
                where: { id: sublevelId },
            }) as unknown as CrosswordSublevel | null;
        } catch (err) {
            throw err;
        }
    }

    async getCrosswordBySublevelId(sublevelId: number): Promise<CrosswordWithTypedContent | null> {
        try {
            return prisma.crossword.findUnique({
                where: { sublevelId },
                select: { id: true, content: true, sublevelId: true, createdAt: true, updatedAt: true },
            }) as unknown as CrosswordWithTypedContent | null;
        } catch (err) {
            throw err;
        }
    }

    async completeSublevel(sublevelId: number): Promise<void> {
        try {
            await prisma.crosswordSublevel.update({
                where: { id: sublevelId },
                data: { completed: true },
            });
        } catch (err) {
            throw err;
        }
    }

    async unlockNextSublevel(sublevelId: number): Promise<CrosswordSublevel | null> {
        try {
            // Получаем текущий подуровень
            const currentSublevel = await prisma.crosswordSublevel.findUnique({
                where: { id: sublevelId },
                include: { level: true },
            });

            if (!currentSublevel) {
                return null;
            }

            // Находим все подуровни в том же уровне
            const allSublevels = await prisma.crosswordSublevel.findMany({
                where: { levelId: currentSublevel.levelId },
                orderBy: { createdAt: "asc" },
            });

            // Находим индекс текущего подуровня
            const currentIndex = allSublevels.findIndex((s) => s.id === sublevelId);
            const nextSublevel = allSublevels[currentIndex + 1];

            // Если следующий подуровень существует и заблокирован, разблокируем его
            if (nextSublevel && nextSublevel.locked) {
                const unlocked = await prisma.crosswordSublevel.update({
                    where: { id: nextSublevel.id },
                    data: { locked: false },
                });

                return unlocked as unknown as CrosswordSublevel;
            }

            return nextSublevel ? (nextSublevel as unknown as CrosswordSublevel) : null;
        } catch (err) {
            throw err;
        }
    }
}


