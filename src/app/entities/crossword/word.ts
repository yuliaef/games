export interface Word {
    position: number;
    clue: string;
    answer: string;
    rowStart: number;
    colStart: number;
    orientation: 'across' | 'down';
    description: string;
    hint?: string;
    imageUrl?: string;
}
