import {ISignInController} from "@/core/controllers/sign-in.controller";
import {ISignInUseCase} from "@/core/application/use-cases/sign-in.use-case";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";
import { ICrosswordsRepository } from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import { IListCrosswordLevelsUseCase } from "@/core/application/use-cases/list-crossword-levels.use-case";
import { IListCrosswordSublevelsUseCase } from "@/core/application/use-cases/list-crossword-sublevels.use-case";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import {IGetCrosswordBySublevelUseCase} from "@/core/application/use-cases/get-crossword-by-sublevel-use.case";
import {IGetCrosswordSublevelUseCase} from "@/core/application/use-cases/get-crossword-sublevel.use-case";
import {ICompleteCrosswordSublevelUseCase} from "@/core/application/use-cases/complete-crossword-sublevel.use-case";
import {IGetCrosswordLevelUseCase} from "@/core/application/use-cases/get-crossword-level.use-case";

export const DI_SYMBOLS = {
    // Services

    // Repositories
    IUsersRepository: Symbol.for('IUsersRepository'),
    ICrosswordLevelsRepository: Symbol.for('ICrosswordLevelsRepository'),

    // Use Cases
    ISignInUseCase: Symbol.for('ISignInUseCase'),
    IListCrosswordLevelsUseCase: Symbol.for('IListCrosswordLevelsUseCase'),
    IListCrosswordSublevelsUseCase: Symbol.for('IListCrosswordSublevelsUseCase'),
    IGetCrosswordBySublevelUseCase: Symbol.for('IGetCrosswordBySublevelUseCase'),
    IGetCrosswordSublevelUseCase: Symbol.for('IGetCrosswordSublevelUseCase'),
    IGetCrosswordLevelUseCase: Symbol.for('IGetCrosswordLevelUseCase'),
    ICompleteCrosswordSublevelUseCase: Symbol.for('ICompleteCrosswordSublevelUseCase'),

    // Controllers
    ISignInController: Symbol.for('ISignInController'),
    ICrosswordController: Symbol.for('ICrosswordController'),
};

export interface DI_RETURN_TYPES {
    // Services

    // Repositories
    IUsersRepository: IUsersRepository;
    ICrosswordLevelsRepository: ICrosswordsRepository;

    // Use Cases
    ISignInUseCase: ISignInUseCase;
    IListCrosswordLevelsUseCase: IListCrosswordLevelsUseCase;
    IListCrosswordSublevelsUseCase: IListCrosswordSublevelsUseCase;
    IGetCrosswordBySublevelUseCase: IGetCrosswordBySublevelUseCase; //!
    IGetCrosswordSublevelUseCase: IGetCrosswordSublevelUseCase;
    IGetCrosswordLevelUseCase: IGetCrosswordLevelUseCase;
    ICompleteCrosswordSublevelUseCase: ICompleteCrosswordSublevelUseCase;

    // Controllers
    ISignInController: ISignInController;
    ICrosswordController: ICrosswordController;
}
