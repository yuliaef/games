import {User} from "@/generated/prisma";

export interface IUsersRepository {
    getUser(id: string): Promise<User | null>;
}
