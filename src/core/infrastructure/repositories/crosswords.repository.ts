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

    async listSublevels(levelId: string): Promise<CrosswordSublevel[]> {
        try {
            return prisma.crosswordSublevel.findMany({
                where: { levelId },
                orderBy: { createdAt: "asc" },
            }) as unknown as CrosswordSublevel[];
        } catch (err) {
            throw err;
        }
    }

    async getSublevelById(sublevelId: string): Promise<CrosswordSublevel | null> {
        try {
            return prisma.crosswordSublevel.findUnique({
                where: { id: sublevelId },
            }) as unknown as CrosswordSublevel | null;
        } catch (err) {
            throw err;
        }
    }

    async getCrosswordBySublevelId(sublevelId: string): Promise<CrosswordWithTypedContent | null> {
        try {
            return prisma.crossword.findUnique({
                where: { sublevelId },
                select: { id: true, content: true, sublevelId: true, createdAt: true, updateddAt: true },
            }) as unknown as CrosswordWithTypedContent | null;
        } catch (err) {
            throw err;
        }
    }
}


