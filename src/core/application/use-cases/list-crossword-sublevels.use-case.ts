import { ICrosswordsRepository } from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import { CrosswordSublevel } from "@/generated/prisma";

export type IListCrosswordSublevelsUseCase = ReturnType<typeof listCrosswordSublevelsUseCase>;

export const listCrosswordSublevelsUseCase = (
    crosswordLevelsRepository: ICrosswordsRepository,
) =>
    async (levelId: number): Promise<CrosswordSublevel[]> => {
        return await crosswordLevelsRepository.listSublevels(levelId);
    };


