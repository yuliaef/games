import { createModule } from '@evyweb/ioctopus';

// import { AuthenticationService } from '@/src/infrastructure/services/authentication.service';
// import { MockAuthenticationService } from '@/src/infrastructure/services/authentication.service.mock';
//
// import { signInUseCase } from '@/src/application/use-cases/auth/sign-in.use-case';
// import { signUpUseCase } from '@/src/application/use-cases/auth/sign-up.use-case';
// import { signOutUseCase } from '@/src/application/use-cases/auth/sign-out.use-case';
//
// import { signInController } from '@/src/interface-adapters/controllers/auth/sign-in.controller';
// import { signOutController } from '@/src/interface-adapters/controllers/auth/sign-out.controller';
// import { signUpController } from '@/src/interface-adapters/controllers/auth/sign-up.controller';

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
