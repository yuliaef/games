import { PrismaClient } from "@/generated/prisma";
import {seedDefaultUser} from "./default-user-seeder";
import {seedLevels} from "./levels-seeder";
import {seedCrosswords} from "./crosswords-seeder";

const prisma = new PrismaClient();

async function main() {
    await seedDefaultUser(prisma);
    //await seedLevels(prisma);
    await seedCrosswords(prisma);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
