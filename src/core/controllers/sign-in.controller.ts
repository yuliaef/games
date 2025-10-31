import { z } from 'zod';

import {InputParseError} from "@/core/entities/errors/common";
import {ISignInUseCase} from "@/core/application/use-cases/sign-in.use-case";

const inputSchema = z.object({
    username: z.string().min(3).max(31),
    password: z.string().min(6).max(31),
});

export type ISignInController = ReturnType<typeof signInController>;

export const signInController =
    (
        signInUseCase: ISignInUseCase
    ) =>
        async (input: Partial<z.infer<typeof inputSchema>>): Promise<{ id: string, name: string }> => {
            const { data, error: inputParseError } = inputSchema.safeParse(input);

            if (inputParseError) {
                throw new InputParseError('Invalid data', { cause: inputParseError });
            }

            return await signInUseCase(data);
        };
