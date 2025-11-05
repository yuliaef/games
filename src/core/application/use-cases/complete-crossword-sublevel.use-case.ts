import { ICrosswordsRepository } from "@/core/application/interfaces/repositories/crosswords.repository.interface";

export interface CompleteSublevelResult {
    success: boolean;
    hasNextSublevel: boolean;
    nextSublevelId: number | null;
}

export type ICompleteCrosswordSublevelUseCase = ReturnType<typeof completeCrosswordSublevelUseCase>;

export const completeCrosswordSublevelUseCase = (
    crosswordLevelsRepository: ICrosswordsRepository,
) =>
    async (sublevelId: number): Promise<CompleteSublevelResult> => {
        // Отмечаем подуровень как завершенный
        await crosswordLevelsRepository.completeSublevel(sublevelId);

        // Разблокируем следующий подуровень
        const nextSublevel = await crosswordLevelsRepository.unlockNextSublevel(sublevelId);

        return {
            success: true,
            hasNextSublevel: !!nextSublevel,
            nextSublevelId: nextSublevel?.id || null,
        };
    };

