import { ICrosswordsRepository } from "@/core/application/interfaces/repositories/crosswords.repository.interface";
import { CrosswordLevel } from "@/generated/prisma";

export type IListCrosswordLevelsUseCase = ReturnType<typeof listCrosswordLevelsUseCase>;

export const listCrosswordLevelsUseCase = (
    crosswordLevelsRepository: ICrosswordsRepository,
) =>
    async (): Promise<CrosswordLevel[]> => {
        return await crosswordLevelsRepository.listLevels();
    };


