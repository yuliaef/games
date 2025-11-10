import { PrismaClient, Prisma } from "@/generated/prisma";

type CrosswordData = {
    words: Array<{
        clue: string;
        answer: string;
        position: number;
        orientation: "across" | "down" | string;
        rowStart: number;
        colStart: number;
        description?: string;
        hint?: string;
        imageUrl?: string;
    }>;
};

const crosswordData1: CrosswordData = {
    words: [
        { clue: "Первое слово", answer: "сникерс", position: 1, orientation: "across", rowStart: 9, colStart: 4, description: "любимая сладость" },
        { clue: "Второе слово", answer: "сабвей", position: 2, orientation: "across", rowStart: 7, colStart:2, description: "самый лучший фастфуд на завтрак" },
        { clue: "Тертье слово", answer: "юникло", position: 3, orientation: "across", rowStart: 3, colStart: 1, description: "любимый бренд одежды" },
        { clue: "Четретое слово", answer: "изюм", position: 4, orientation: "down", rowStart: 1, colStart: 1, description: "то, чем можно испортить хлеб" },
        { clue: "Пятое слово", answer: "кебаб", position: 5, orientation: "down", rowStart: 3, colStart: 4, description: "ради чего стоит снова и снова возвращатиься в Турцию?)" },
        { clue: "Шестое слово", answer: "вода", position: 6, orientation: "down", rowStart: 2, colStart: 6, description: "какой продукт заставил тебя чувствовать стыд в Милане" },
        { clue: "Седьмое слово", answer: "вена", position: 7, orientation: "down", rowStart: 7, colStart: 5, description: "самый запомнившийся город" },
        { clue: "Восьмое слово", answer: "бассейн", position: 8, orientation: "down", rowStart: 7, colStart: 10, description: "самое кайфовое место в Тбилиси" },
        { clue: "Девятое слово", answer: "валенсия", position: 9, orientation: "across", rowStart: 11, colStart: 7, description: "где было сделано это фото?)" },
        { clue: "Десятое слово", answer: "кокос", position: 10, orientation: "down", rowStart: 7, colStart: 12, description: "мороженое с каким продуктом в Саранске делают лучше чем в Испании?" },
        { clue: "Одиннадцатое слово", answer: "медвежонок", position: 11, orientation: "across", rowStart: 13, colStart: 3, description: "как бы ты никогда не подумал, что тебя будут называть?" },
    ],
};

const crosswordData2: CrosswordData = {
    words: [
        { clue: "Первое слово", answer: "secuestrada", position: 1, orientation: "down", rowStart: 1, colStart: 13, description: "mi mujer está 'похищена'" },
        { clue: "Второе слово", answer: "manana", position: 2, orientation: "down", rowStart: 3, colStart: 9, description: "actualmente estoy aprendiendo 'испанский'" },
        { clue: "Тертье слово", answer: "cumpleanos", position: 3, orientation: "across", rowStart: 7, colStart: 2, description: "День Рождения" },
        { clue: "Четретое слово", answer: "cinco", position: 4, orientation: "down", rowStart: 4, colStart: 2, description: "uno, dos, tres, cuatro, ___" },
        { clue: "Пятое слово", answer: "por favor", position: 5, orientation: "down", rowStart: 7, colStart: 5, description: "un café y una coca-cola, ___" },
        { clue: "Шестое слово", answer: "mujer", position: 6, orientation: "across", rowStart: 15, colStart: 1, description: "el día internacional de la ___" },
        { clue: "Седьмое слово", answer: "querida", position: 7, orientation: "down", rowStart: 5, colStart: 7, description: "mi ___" },
        { clue: "Восьмое слово", answer: "osito", position: 8, orientation: "down", rowStart: 6, colStart: 11, description: "'медвежонок'" },
        { clue: "Девятое слово", answer: "olvidado", position: 9, orientation: "across", rowStart: 10, colStart: 11, description: "se me ha 'забыл' todo el español" },
        { clue: "Десятое слово", answer: "comido", position: 10, orientation: "down", rowStart: 9, colStart: 18, description: "no he 'поел' tres dias" },
    ],
};

const crosswordData3: CrosswordData = {
    words: [
        { clue: "Первое слово", answer: "диплом", position: 1, orientation: "across", rowStart: 2, colStart: 14, description: "это то что я делала, когда сделала это фото", hint: "на нем сайт с расписанием сдачи", imageUrl: '/images/crosswords/1.jpg' },
        { clue: "Второе слово", answer: "нерешаемая", position: 2, orientation: "across", rowStart: 11, colStart: 5, description: "эта головоломка была ...", imageUrl: '/images/crosswords/2.jpg' },
        { clue: "Тертье слово", answer: "лыжник", position: 3, orientation: "across", rowStart: 16, colStart: 6, description: "на фото очень отважный ...", imageUrl: '/images/crosswords/3.jpg' },
        { clue: "Четретое слово", answer: "футбол", position: 4, orientation: "down", rowStart: 4, colStart: 2, description: "это было когда я ходила как волонтер на ...", imageUrl: '/images/crosswords/4.jpg' },
        { clue: "Пятое слово", answer: "эвакуатор", position: 5, orientation: "down", rowStart: 3, colStart: 7, description: "в тот день мы вызвали ___", imageUrl: '/images/crosswords/5.jpg' },
        { clue: "Шестое слово", answer: "ребенок", position: 6, orientation: "down", rowStart: 10, colStart: 11, description: "эту веточку подарил мне ___", imageUrl: '/images/crosswords/6.jpg' },
        { clue: "Седьмое слово", answer: "пиньята", position: 7, orientation: "across", rowStart: 14, colStart: 9, description: " на дне рождения была ___ в виде египетской пирамиды", imageUrl: '/images/crosswords/7.jpg' },
        { clue: "Восьмое слово", answer: "док-станция", position: 8, orientation: "across", rowStart: 8, colStart: 1, description: "это была ... от моего ноутбука", imageUrl: '/images/crosswords/8.jpg' },
        { clue: "Девятое слово", answer: "замороженное", position: 9, orientation: "across", rowStart: 5, colStart: 6, description: "масло было ___", imageUrl: '/images/crosswords/9.jpg' },
        { clue: "Десятое слово", answer: "мечта", position: 10, orientation: "down", rowStart: 2, colStart: 19, description: "это была моя ___", imageUrl: '/images/crosswords/10.jpg' },
        { clue: "Одиннадцатое слово", answer: "диван", position: 11, orientation: "down", rowStart: 1, colStart: 15, description: "так я ударилась об ___", imageUrl: '/images/crosswords/11.jpg' },
    ],
};

const LINK_IDS = [
    1,2,3
];

async function resolveSublevelId(idOrLevelId: number, prisma: PrismaClient): Promise<number> {
    const subById = await prisma.crosswordSublevel.findUnique({
        where: { id: idOrLevelId },
        select: { id: true },
    });
    if (subById) return subById.id;

    const subByLevel = await prisma.crosswordSublevel.findFirst({
        where: { levelId: idOrLevelId },
        select: { id: true },
        orderBy: { createdAt: "asc" },
    });
    if (subByLevel) return subByLevel.id;

    throw new Error(
        `Не найден подуровень ни по id, ни по levelId: ${idOrLevelId}. ` +
        `Убедись, что подуровни/уровни существуют до запуска сидера.`
    );
}

export async function seedCrosswords(prisma: PrismaClient) {
    const payloads: Prisma.CrosswordCreateInput[] = [];

    const subId1 = await resolveSublevelId(LINK_IDS[0], prisma);
    const subId2 = await resolveSublevelId(LINK_IDS[1], prisma);
    const subId3 = await resolveSublevelId(LINK_IDS[2], prisma);

    payloads.push({
        sublevel: { connect: { id: subId1 } },
        content: crosswordData1 as unknown as Prisma.InputJsonValue,
    });
    payloads.push({
        sublevel: { connect: { id: subId2 } },
        content: crosswordData2 as unknown as Prisma.InputJsonValue,
    });
    payloads.push({
        sublevel: { connect: { id: subId3 } },
        content: crosswordData3 as unknown as Prisma.InputJsonValue,
    });

    for (const data of payloads) {
        await prisma.crossword.create({ data });
    }
}
