import {Word} from "@/app/entities/crossword/word";
import {Point} from "@/app/entities/crossword/point";
import {Cell} from "@/app/entities/crossword/cell";
import {Definition} from "@/app/entities/crossword/definition";
import {CrosswordState} from "@/app/entities/crossword/state";

export function computeWordsCoords(words: Word[]): { coords: Point[][]; rows: number; cols: number } {
    const coords: Point[][] = [];
    let maxRow = 0;
    let maxCol = 0;

    for (let i = 0; i < words.length; i++) {
        coords.push([]);
        const word = { ...words[i] };
        for (let j = 0; j < word.answer.length; j++) {
            const row = word.orientation === "across" ? word.rowStart : word.rowStart++;
            const col = word.orientation === "across" ? word.colStart++ : word.colStart;
            coords[i].push({ row, col });
            if (row > maxRow) maxRow = row;
            if (col > maxCol) maxCol = col;
        }
    }

    return { coords, rows: maxRow, cols: maxCol };
}

export function createCellsValues(rows: number, cols: number): (string | null)[][] {
    const values: (string | null)[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: (string | null)[] = [];
        for (let j = 0; j < cols; j++) row.push(null);
        values.push(row);
    }
    return values;
}

export function createCellsProperties(rows: number, cols: number, wordsCoords: Point[][]): Cell[][] {
    const cells: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < cols; j++) {
            const cell: Cell = {
                row: i + 1,
                col: j + 1,
                isCorrect: false,
                isIncorrect: false,
                isActive: false,
                wordIndexes: [],
            };
            for (let w = 0; w < wordsCoords.length; w++) {
                const positions = wordsCoords[w];
                for (let p = 0; p < positions.length; p++) {
                    const pt = positions[p];
                    if (pt.row === i + 1 && pt.col === j + 1) {
                        cell.wordIndexes.push(w);
                    }
                }
            }
            row.push(cell);
        }
        cells.push(row);
    }
    return cells;
}

export function createDefinitions(words: Word[]): Definition[] {
    return words.map((w) => ({
        clue: w.clue,
        number: w.position,
        isDone: false,
        description: w.description,
        hint: w.hint,
        imageUrl: w.imageUrl,
    }));
}

export function computeFirstCells(wordsCoords: Point[][]): Point[] {
    return wordsCoords.map((coords) => coords[0]);
}
/**
 * Возвращает текущее введённое значение активного слова.
 */
export function getActiveWordValue(state: CrosswordState): string {
    const coords = state.wordsCoords[state.activePosition] ?? [];
    let value = "";

    for (let i = 0; i < coords.length; i++) {
        const rowIndex = coords[i].row - 1;
        const colIndex = coords[i].col - 1;
        value += state.cellsValues[rowIndex]?.[colIndex] ?? "";
    }

    return value;
}

/**
 * Подсвечивает клетки слова как правильные / неправильные.
 */
export function highlightWord(
    state: CrosswordState,
    wordIndex: number,
    isCorrect: boolean,
    isIncorrect: boolean
) {
    for (let i = 0; i < state.cellsProperties.length; i++) {
        for (let j = 0; j < state.cellsProperties[i].length; j++) {
            const cell = state.cellsProperties[i][j];
            if (cell.wordIndexes.includes(wordIndex)) {
                cell.isCorrect = isCorrect;
                cell.isIncorrect = isIncorrect;
            }
        }
    }
}

/**
 * Устанавливает активность клеток для выбранного слова.
 */
export function setActiveForWord(state: CrosswordState, wordIndex: number) {
    for (let i = 0; i < state.cellsProperties.length; i++) {
        for (let j = 0; j < state.cellsProperties[i].length; j++) {
            const cell = state.cellsProperties[i][j];
            cell.isActive = cell.wordIndexes.includes(wordIndex);
        }
    }
}

/**
 * Проверяет текущее введённое слово и обновляет состояние
 * (подсветку и выполненность подсказок).
 */
export function validateActiveWord(state: CrosswordState, currentValue: string) {
    const activeWord = state.wordsProperties[state.activePosition];
    if (!activeWord) return;

    const expectedLength = activeWord.answer.length;
    const isFull = currentValue.length === expectedLength;
    const isCorrect = currentValue.toLowerCase() === activeWord.answer.toLowerCase();

    if (isFull) {
        highlightWord(state, state.activePosition, isCorrect, !isCorrect);
    } else {
        highlightWord(state, state.activePosition, false, false);
    }

    // Обновляем флаг "выполнено" у подсказки активного слова
    state.definitionProperties = state.definitionProperties.map((definition) =>
        definition.number - 1 === state.activePosition
            ? { ...definition, isDone: isFull && isCorrect }
            : definition
    );
}
