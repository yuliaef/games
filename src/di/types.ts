import {ISignInController} from "@/core/controllers/sign-in.controller";
import {ISignInUseCase} from "@/core/application/use-cases/sign-in.use-case";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";

export const DI_SYMBOLS = {
    // Services

    // Repositories
    IUsersRepository: Symbol.for('IUsersRepository'),

    // Use Cases
    ISignInUseCase: Symbol.for('ISignInUseCase'),

    // Controllers
    ISignInController: Symbol.for('ISignInController'),
};

export interface DI_RETURN_TYPES {
    // Services

    // Repositories
    IUsersRepository: IUsersRepository;

    // Use Cases
    ISignInUseCase: ISignInUseCase;

    // Controllers
    ISignInController: ISignInController;
}
