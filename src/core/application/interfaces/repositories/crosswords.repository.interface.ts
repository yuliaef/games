import { CrosswordLevel, CrosswordSublevel, Crossword } from "@/generated/prisma";
import {CrosswordData} from "@/app/entities/crossword/crossword";

export type CrosswordWithTypedContent = Omit<Crossword, "content"> & { content: CrosswordData };

export interface ICrosswordsRepository {
    listLevels(): Promise<CrosswordLevel[]>;
    listSublevels(levelId: number): Promise<CrosswordSublevel[]>;
    getSublevelById(sublevelId: number): Promise<CrosswordSublevel | null>;
    getLevelById(levelId: number): Promise<CrosswordLevel | null>;
    getCrosswordBySublevelId(sublevelId: number): Promise<CrosswordWithTypedContent | null>;
    completeSublevel(sublevelId: number): Promise<void>;
    unlockNextSublevel(sublevelId: number): Promise<CrosswordSublevel | null>;
}


