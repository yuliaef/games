import { PrismaClient } from "@/generated/prisma";
import {seedDefaultUser} from "./default-user-seeder";

const prisma = new PrismaClient();

async function main() {
    await seedDefaultUser(prisma);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
