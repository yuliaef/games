import { CrosswordLevel, CrosswordSublevel, Crossword } from "@/generated/prisma";
import {CrosswordData} from "@/app/entities/crossword/crossword";

export type CrosswordWithTypedContent = Omit<Crossword, "content"> & { content: CrosswordData };

export interface ICrosswordsRepository {
    listLevels(): Promise<CrosswordLevel[]>;
    listSublevels(levelId: string): Promise<CrosswordSublevel[]>;
    getSublevelById(sublevelId: string): Promise<CrosswordSublevel | null>;
    getCrosswordBySublevelId(sublevelId: string): Promise<CrosswordWithTypedContent | null>;
}


