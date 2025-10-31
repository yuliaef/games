import bcryptjs from "bcryptjs";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase =
    (
        usersRepository: IUsersRepository,
    ) =>
        async (input: {
            username: string;
            password: string;
        }): Promise<{ id: string; name: string }> => {
            const existingUser = await usersRepository.getUser(
                input.username
            );

            if (!existingUser) {
                throw new Error('User does not exist');
            }

            const validPassword = await bcryptjs.compare(
                input.password,
                existingUser.password
            );

            if (!validPassword) {
                throw new Error('Incorrect username or password');
            }

            return { id: existingUser.id, name: existingUser.username };
        };
