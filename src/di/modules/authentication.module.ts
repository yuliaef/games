import { createModule } from '@evyweb/ioctopus';
import {DI_SYMBOLS} from "../types";
import {signInUseCase} from "@/core/application/use-cases/sign-in.use-case";
import {signInController} from "@/core/controllers/sign-in.controller";

export function createAuthenticationModule() {
    const authenticationModule = createModule();

    authenticationModule
        .bind(DI_SYMBOLS.ISignInUseCase)
        .toHigherOrderFunction(signInUseCase, [
            DI_SYMBOLS.IUsersRepository,
        ]);

    authenticationModule
        .bind(DI_SYMBOLS.ISignInController)
        .toHigherOrderFunction(signInController, [
            DI_SYMBOLS.ISignInUseCase,
        ]);

    return authenticationModule;
}
