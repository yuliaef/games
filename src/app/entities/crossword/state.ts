import {Point} from "@/app/entities/crossword/point";
import {Word} from "@/app/entities/crossword/word";
import {Definition} from "@/app/entities/crossword/definition";
import {Cell} from "@/app/entities/crossword/cell";

export interface CrosswordState {
    wordsCoords: Point[][];
    wordsCount: number;
    wordsProperties: Word[];
    rowsCount: number;
    colsCount: number;
    cellsProperties: Cell[][];
    cellsValues: (string | null)[][];
    activePosition: number;
    firstCellsOfWords: Point[];
    definitionProperties: Definition[];
    isLoading: boolean;
    hasLoadingError: boolean;
}

export function createEmptyState(): CrosswordState {
    return {
        wordsCoords: [],
        wordsCount: 0,
        wordsProperties: [],
        rowsCount: 0,
        colsCount: 0,
        cellsProperties: [],
        cellsValues: [],
        activePosition: 0,
        firstCellsOfWords: [],
        definitionProperties: [],
        isLoading: false,
        hasLoadingError: false,
    };
}
