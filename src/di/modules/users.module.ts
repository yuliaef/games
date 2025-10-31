import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types";
import {UsersRepository} from "@/core/infrastructure/repositories/users.repository";

export function createUsersModule() {
    const usersModule = createModule();

    usersModule
        .bind(DI_SYMBOLS.IUsersRepository)
        .toClass(UsersRepository);

    return usersModule;
}
