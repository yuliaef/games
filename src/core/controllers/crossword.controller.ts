import { IListCrosswordLevelsUseCase } from "@/core/application/use-cases/list-crossword-levels.use-case";
import { IListCrosswordSublevelsUseCase } from "@/core/application/use-cases/list-crossword-sublevels.use-case";
import { IGetCrosswordBySublevelUseCase } from "@/core/application/use-cases/get-crossword-by-sublevel-use.case";
import { IGetCrosswordSublevelUseCase } from "@/core/application/use-cases/get-crossword-sublevel.use-case";
import { ICompleteCrosswordSublevelUseCase, CompleteSublevelResult } from "@/core/application/use-cases/complete-crossword-sublevel.use-case";
import { CrosswordLevel, CrosswordSublevel } from "@/generated/prisma";
import {CrosswordWithTypedContent} from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import {IGetCrosswordLevelUseCase} from "@/core/application/use-cases/get-crossword-level.use-case";
import {ICompleteCrosswordLevelUseCase} from "@/core/application/use-cases/complete-crossword-level.use-case";

export type ICrosswordController = ReturnType<typeof crosswordController>;

export const crosswordController = (
    listLevelsUseCase: IListCrosswordLevelsUseCase,
    listSublevelsUseCase: IListCrosswordSublevelsUseCase,
    getCrosswordContentBySublevelUseCase: IGetCrosswordBySublevelUseCase,
    getCrosswordSublevelUseCase: IGetCrosswordSublevelUseCase,
    getCrosswordLevelUseCase: IGetCrosswordLevelUseCase,
    completeCrosswordSublevelUseCase: ICompleteCrosswordSublevelUseCase,
    completeCrosswordLevelUseCase: ICompleteCrosswordLevelUseCase,
) => ({
    listLevels: async (): Promise<CrosswordLevel[]> => listLevelsUseCase(),
    listSublevels: async (levelId: number): Promise<CrosswordSublevel[]> => listSublevelsUseCase(levelId),
    getCrosswordBySublevelId: async (sublevelId: number): Promise<CrosswordWithTypedContent> => getCrosswordContentBySublevelUseCase(sublevelId),
    getSublevelById: async (sublevelId: number): Promise<CrosswordSublevel> => getCrosswordSublevelUseCase(sublevelId),
    getLevelById: async (levelId: number): Promise<CrosswordLevel> => getCrosswordLevelUseCase(levelId),
    completeSublevel: async (sublevelId: number): Promise<CompleteSublevelResult> => completeCrosswordSublevelUseCase(sublevelId),
    completeLevel: async (levelId: number): Promise<void> => completeCrosswordLevelUseCase(levelId),
});


