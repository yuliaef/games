import { createContainer } from '@evyweb/ioctopus';

import {DI_RETURN_TYPES, DI_SYMBOLS} from "./types";

import {createAuthenticationModule} from "./modules/authentication.module";
import {createUsersModule} from "@/di/modules/users.module";
import { createCrosswordLevelsModule } from "@/di/modules/crossword-levels.module";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('AuthenticationModule'), createAuthenticationModule());
ApplicationContainer.load(Symbol('UsersModule'), createUsersModule());
ApplicationContainer.load(Symbol('CrosswordLevelsModule'), createCrosswordLevelsModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]) as DI_RETURN_TYPES[K];
}

