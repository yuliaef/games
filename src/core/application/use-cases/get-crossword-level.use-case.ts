import {
    ICrosswordsRepository
} from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import {CrosswordLevel} from "@/generated/prisma";

export type IGetCrosswordLevelUseCase = ReturnType<typeof getCrosswordLevelUseCase>;

export const getCrosswordLevelUseCase = (
    crosswordLevelsRepository: ICrosswordsRepository,
) =>
    async (levelId: number): Promise<CrosswordLevel> => {
        const level = await crosswordLevelsRepository.getLevelById(levelId);

        if (!level) {
            throw new Error("Level not found");
        }

        return level;
    };





