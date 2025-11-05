import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "@/di/types";
import { CrosswordsRepository } from "@/core/infrastructure/repositories/crosswords.repository";
import { listCrosswordLevelsUseCase } from "@/core/application/use-cases/list-crossword-levels.use-case";
import { listCrosswordSublevelsUseCase } from "@/core/application/use-cases/list-crossword-sublevels.use-case";
import { crosswordController } from "@/core/controllers/crossword.controller";
import { getCrosswordBySublevelUseCase } from "@/core/application/use-cases/get-crossword-by-sublevel-use.case";

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
        .bind(DI_SYMBOLS.ICrosswordController)
        .toHigherOrderFunction(crosswordController, [
            DI_SYMBOLS.IListCrosswordLevelsUseCase,
            DI_SYMBOLS.IListCrosswordSublevelsUseCase,
            DI_SYMBOLS.IGetCrosswordBySublevelUseCase,
        ]);

    return moduleRef;
}


