import prisma from "@/utils/prisma";
import {User} from "@/generated/prisma";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";

export class UsersRepository implements IUsersRepository {
    async getUser(username: string): Promise<User | null> {
        try {
            return prisma.user.findFirst({
                where: {
                    username
                }
            });
        } catch (err) {
            throw err;
        }
    }
}
