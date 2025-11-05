import { IListCrosswordLevelsUseCase } from "@/core/application/use-cases/list-crossword-levels.use-case";
import { IListCrosswordSublevelsUseCase } from "@/core/application/use-cases/list-crossword-sublevels.use-case";
import { IGetCrosswordBySublevelUseCase } from "@/core/application/use-cases/get-crossword-by-sublevel-use.case";
import { CrosswordLevel, CrosswordSublevel } from "@/generated/prisma";
import {CrosswordWithTypedContent} from "@/core/application/interfaces/repositories/crosswords.repository.interface";

export type ICrosswordController = ReturnType<typeof crosswordController>;

export const crosswordController = (
    listLevelsUseCase: IListCrosswordLevelsUseCase,
    listSublevelsUseCase: IListCrosswordSublevelsUseCase,
    getCrosswordContentBySublevelUseCase: IGetCrosswordBySublevelUseCase,
) => ({
    listLevels: async (): Promise<CrosswordLevel[]> => listLevelsUseCase(),
    listSublevels: async (levelId: string): Promise<CrosswordSublevel[]> => listSublevelsUseCase(levelId),
    getCrosswordBySublevelId: async (sublevelId: string): Promise<CrosswordWithTypedContent> => getCrosswordContentBySublevelUseCase(sublevelId),
});


