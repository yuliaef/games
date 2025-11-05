import {ISignInController} from "@/core/controllers/sign-in.controller";
import {ISignInUseCase} from "@/core/application/use-cases/sign-in.use-case";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";
import { ICrosswordsRepository } from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import { IListCrosswordLevelsUseCase } from "@/core/application/use-cases/list-crossword-levels.use-case";
import { IListCrosswordSublevelsUseCase } from "@/core/application/use-cases/list-crossword-sublevels.use-case";
import { ICrosswordController } from "@/core/controllers/crossword.controller";
import {IGetCrosswordBySublevelUseCase} from "@/core/application/use-cases/get-crossword-by-sublevel-use.case";

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
    IGetCrossworBySublevelUseCase: IGetCrosswordBySublevelUseCase;

    // Controllers
    ISignInController: ISignInController;
    ICrosswordController: ICrosswordController;
}
