import { ICrosswordsRepository } from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import { CrosswordSublevel } from "@/generated/prisma";

export type IGetCrosswordSublevelUseCase = ReturnType<typeof getCrosswordSublevelUseCase>;

export const getCrosswordSublevelUseCase = (
    crosswordLevelsRepository: ICrosswordsRepository,
) =>
    async (sublevelId: number): Promise<CrosswordSublevel> => {
        const sublevel = await crosswordLevelsRepository.getSublevelById(sublevelId);

        if (!sublevel) {
            throw new Error("Sublevel not found");
        }

        return sublevel;
    };

