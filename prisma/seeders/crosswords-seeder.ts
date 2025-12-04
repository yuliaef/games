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
        { clue: "Первое слово", answer: "сникерс", position: 1, orientation: "across", rowStart: 9, colStart: 4, description: "Твоя любимая сладость" },
        { clue: "Второе слово", answer: "сабвей", position: 2, orientation: "across", rowStart: 7, colStart:2, description: "Самый лучший фастфуд на завтрак" },
        { clue: "Тертье слово", answer: "юникло", position: 3, orientation: "across", rowStart: 3, colStart: 1, description: "Твой любимый бренд одежды" },
        { clue: "Четретое слово", answer: "изюм", position: 4, orientation: "down", rowStart: 1, colStart: 1, description: "То, чем можно для тебя испортить хлеб, если положить это туда" },
        { clue: "Пятое слово", answer: "кебаб", position: 5, orientation: "down", rowStart: 3, colStart: 4, description: "То, ради чего стоит снова и снова возвращатиься в Турцию)))" },
        { clue: "Шестое слово", answer: "вода", position: 6, orientation: "down", rowStart: 2, colStart: 6, description: "Какой продукт заставил тебя чувствовать стыд в Милане?)" },
        { clue: "Седьмое слово", answer: "вена", position: 7, orientation: "down", rowStart: 7, colStart: 5, description: "Самый запомнившийся тебе город" },
        { clue: "Восьмое слово", answer: "бассейн", position: 8, orientation: "down", rowStart: 7, colStart: 10, description: "Самое кайфовое место в Тбилиси" },
        { clue: "Девятое слово", answer: "валенсия", position: 9, orientation: "across", rowStart: 11, colStart: 7, description: "Где было сделано это фото?)", imageUrl: "/images/crosswords/12.jpg" },
        { clue: "Десятое слово", answer: "кокос", position: 10, orientation: "down", rowStart: 7, colStart: 12, description: "Мороженое с каким продуктом в Саранске делают лучше, чем в Испании?" },
        { clue: "Одиннадцатое слово", answer: "медвежонок", position: 11, orientation: "across", rowStart: 13, colStart: 3, description: "Как бы ты никогда не подумал, что тебя будут так называть?)" },
    ],
};

const crosswordData2: CrosswordData = {
    words: [
        { clue: "Первое слово", answer: "secuestrada", position: 1, orientation: "down", rowStart: 1, colStart: 15, description: "Mi mujer está 'похищена'" },
        { clue: "Второе слово", answer: "manana", position: 2, orientation: "down", rowStart: 3, colStart: 9, description: "Самое любимое слово у носителей испанского!" },
        { clue: "Тертье слово", answer: "cumpleanos", position: 3, orientation: "across", rowStart: 7, colStart: 2, description: "Как сказать День Рождения?)" },
        { clue: "Четретое слово", answer: "cinco", position: 4, orientation: "down", rowStart: 4, colStart: 2, description: "Uno, dos, tres, cuatro, ___" },
        { clue: "Пятое слово", answer: "por favor", position: 5, orientation: "down", rowStart: 7, colStart: 5, description: "Un café y una coca-cola, ___" },
        { clue: "Шестое слово", answer: "mujer", position: 6, orientation: "across", rowStart: 15, colStart: 1, description: "El día internacional de la ___" },
        { clue: "Седьмое слово", answer: "querida", position: 7, orientation: "down", rowStart: 5, colStart: 7, description: "Mi ___" },
        { clue: "Восьмое слово", answer: "osito", position: 8, orientation: "down", rowStart: 6, colStart: 11, description: "Как сказать 'медвежонок'?)" },
        { clue: "Девятое слово", answer: "olvidado", position: 9, orientation: "across", rowStart: 10, colStart: 11, description: "Se me ha 'забылся' todo el español" },
        { clue: "Десятое слово", answer: "comido", position: 10, orientation: "down", rowStart: 9, colStart: 18, description: "No he 'ел' tres dias" },
    ],
};

const crosswordData3: CrosswordData = {
    words: [
        { clue: "Первое слово", answer: "диплом", position: 1, orientation: "across", rowStart: 2, colStart: 14, description: "Слово - это то, что я делала (долгое время), когда сделала это фото", hint: "На нем сайт с расписанием сдачи ...", imageUrl: '/images/crosswords/1.jpg' },
        { clue: "Второе слово", answer: "нерешаемая", position: 2, orientation: "across", rowStart: 11, colStart: 5, description: "Эта головоломка была ___", imageUrl: '/images/crosswords/2.jpg', hint: "Очень очень сложная или вообще ___" },
        { clue: "Тертье слово", answer: "лыжник", position: 3, orientation: "across", rowStart: 16, colStart: 6, description: "На фото очень отважный ___", imageUrl: '/images/crosswords/3.jpg' },
        { clue: "Четретое слово", answer: "футбол", position: 4, orientation: "down", rowStart: 4, colStart: 2, description: "Это было когда я ходила как волонтер на ___", imageUrl: '/images/crosswords/4.jpg' },
        { clue: "Пятое слово", answer: "эвакуатор", position: 5, orientation: "down", rowStart: 3, colStart: 7, description: "В тот день мы вызвали ___", imageUrl: '/images/crosswords/5.jpg', hint: "На фото матиз и он сломался" },
        { clue: "Шестое слово", answer: "ребенок", position: 6, orientation: "down", rowStart: 10, colStart: 11, description: "Эту веточку подарил мне в парке ___", imageUrl: '/images/crosswords/6.jpg', hint: "Я не знаю лично этого человека и это бьл полный рандом" },
        { clue: "Седьмое слово", answer: "пиньята", position: 7, orientation: "across", rowStart: 14, colStart: 9, description: "На дне рождения моего знакомого была ___ в виде египетской пирамиды", imageUrl: '/images/crosswords/7.jpg' },
        { clue: "Восьмое слово", answer: "док-станция", position: 8, orientation: "across", rowStart: 8, colStart: 1, description: "Это была ___ от моего ноутбука", imageUrl: '/images/crosswords/8.jpg', hint: "Это то, что я отдала назад в Кодмастерс" },
        { clue: "Девятое слово", answer: "замороженное", position: 9, orientation: "across", rowStart: 5, colStart: 6, description: "Масло на фото было ___", imageUrl: '/images/crosswords/9.jpg', hint: "Из-за того, каким было масло, это случилось с бедным ножом" },
        { clue: "Десятое слово", answer: "мечта", position: 10, orientation: "down", rowStart: 2, colStart: 19, description: "Это была моя ___", imageUrl: '/images/crosswords/10.jpg', hint: "Я очень сильно хотела так покушать тортик)))" },
        { clue: "Одиннадцатое слово", answer: "диван", position: 11, orientation: "down", rowStart: 1, colStart: 15, description: "Так я ударилась об ___", imageUrl: '/images/crosswords/11.jpg', hint: "Это предмет мебели" },
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
