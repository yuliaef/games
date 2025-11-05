import {
    CrosswordWithTypedContent,
    ICrosswordsRepository
} from "@/core/application/interfaces/repositories/crosswords.repository.interface";

export type IGetCrosswordBySublevelUseCase = ReturnType<typeof getCrosswordBySublevelUseCase>;

export const getCrosswordBySublevelUseCase = (
    crosswordLevelsRepository: ICrosswordsRepository,
) =>
    async (sublevelId: string): Promise<CrosswordWithTypedContent> => {
        const crossword = await crosswordLevelsRepository.getCrosswordBySublevelId(sublevelId);

        if (!crossword) {
            throw new Error("Crossword not found");
        }

        return crossword;
    };



