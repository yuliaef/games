import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "@/di/types";
import { CrosswordsRepository } from "@/core/infrastructure/repositories/crosswords.repository";
import { listCrosswordLevelsUseCase } from "@/core/application/use-cases/list-crossword-levels.use-case";
import { listCrosswordSublevelsUseCase } from "@/core/application/use-cases/list-crossword-sublevels.use-case";
import { crosswordController } from "@/core/controllers/crossword.controller";
import { getCrosswordBySublevelUseCase } from "@/core/application/use-cases/get-crossword-by-sublevel-use.case";
import { getCrosswordSublevelUseCase } from "@/core/application/use-cases/get-crossword-sublevel.use-case";
import { completeCrosswordSublevelUseCase } from "@/core/application/use-cases/complete-crossword-sublevel.use-case";
import {getCrosswordLevelUseCase} from "@/core/application/use-cases/get-crossword-level.use-case";

export function createCrosswordLevelsModule() {
    const moduleRef = createModule();

    moduleRef
        .bind(DI_SYMBOLS.ICrosswordLevelsRepository)
        .toClass(CrosswordsRepository);

    moduleRef
        .bind(DI_SYMBOLS.IListCrosswordLevelsUseCase)
        .toHigherOrderFunction(listCrosswordLevelsUseCase, [
            DI_SYMBOLS.ICrosswordLevelsRepository,
        ]);

    moduleRef
        .bind(DI_SYMBOLS.IListCrosswordSublevelsUseCase)
        .toHigherOrderFunction(listCrosswordSublevelsUseCase, [
            DI_SYMBOLS.ICrosswordLevelsRepository,
        ]);

    moduleRef
        .bind(DI_SYMBOLS.IGetCrosswordBySublevelUseCase)
        .toHigherOrderFunction(getCrosswordBySublevelUseCase, [
            DI_SYMBOLS.ICrosswordLevelsRepository,
        ]);

    moduleRef
        .bind(DI_SYMBOLS.IGetCrosswordSublevelUseCase)
        .toHigherOrderFunction(getCrosswordSublevelUseCase, [
            DI_SYMBOLS.ICrosswordLevelsRepository,
        ]);

    moduleRef
        .bind(DI_SYMBOLS.IGetCrosswordLevelUseCase)
        .toHigherOrderFunction(getCrosswordLevelUseCase, [
            DI_SYMBOLS.ICrosswordLevelsRepository,
        ]);


    moduleRef
        .bind(DI_SYMBOLS.ICompleteCrosswordSublevelUseCase)
        .toHigherOrderFunction(completeCrosswordSublevelUseCase, [
            DI_SYMBOLS.ICrosswordLevelsRepository,
        ]);

    moduleRef
        .bind(DI_SYMBOLS.ICrosswordController)
        .toHigherOrderFunction(crosswordController, [
            DI_SYMBOLS.IListCrosswordLevelsUseCase,
            DI_SYMBOLS.IListCrosswordSublevelsUseCase,
            DI_SYMBOLS.IGetCrosswordBySublevelUseCase,
            DI_SYMBOLS.IGetCrosswordSublevelUseCase,
            DI_SYMBOLS.IGetCrosswordLevelUseCase,
            DI_SYMBOLS.ICompleteCrosswordSublevelUseCase,
        ]);

    return moduleRef;
}


