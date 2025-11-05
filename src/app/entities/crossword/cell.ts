import {Point} from "@/app/entities/crossword/point";

export interface Cell extends Point {
    isCorrect: boolean;
    isIncorrect: boolean;
    isActive: boolean;
    wordIndexes: number[];
}
