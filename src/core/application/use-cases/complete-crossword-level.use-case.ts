import {ICrosswordsRepository} from "@/core/application/interfaces/repositories/crosswords.repository.interface";

export type ICompleteCrosswordLevelUseCase = ReturnType<typeof completeCrosswordLevelUseCase>;

export const completeCrosswordLevelUseCase = (
    crosswordsRepository: ICrosswordsRepository,
) =>
    async (levelId: number): Promise<void> => {
        await crosswordsRepository.completeLevel(levelId);
    };


