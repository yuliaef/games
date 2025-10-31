import { PrismaClient, Prisma } from "@/generated/prisma";
import {saltAndHashPassword} from "@/utils/salt-and-hash-password";

export async function seedDefaultUser(prisma: PrismaClient) {
    const userData: Prisma.UserCreateInput = {
        username: "osito",
        password: await saltAndHashPassword("mikerida"),
    };

    await prisma.user.upsert({
        where: { username: userData.username },
        update: {},
        create: userData,
    });
}
