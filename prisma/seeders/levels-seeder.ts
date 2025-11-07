import { PrismaClient } from "@/generated/prisma";

export async function seedLevels(prisma: PrismaClient) {
    await prisma.crosswordLevel.create({
        data: {
            name: "¡Feliz cumpleaños!",
            completed: false,
            phrase: "Леха con suéter rojo ganó",
            sublevels: {
                create: [
                    {
                        name: "Разминка!",
                        completed: false,
                        locked: true,
                        phrasePart: "ganó",
                    },
                    {
                        name: "Aprendiendo español",
                        completed: false,
                        locked: false,
                        phrasePart: "suéter rojo",
                    },
                    {
                        name: "Сыщик в кроссвордах!!!",
                        completed: false,
                        locked: true,
                        phrasePart: "Леха con",
                    },

                ],
            },
        },
        include: { sublevels: true },
    });
}
