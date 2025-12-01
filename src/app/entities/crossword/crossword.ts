import {Word} from "@/app/entities/crossword/word";

export interface CrosswordData {
    words: Word[];
}

export interface CellInteractionSettings {
    mode: 'click' | 'keyboard';
    positions: number[];
    row?: number;
    col?: number;
}
