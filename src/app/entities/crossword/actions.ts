import {CellInteractionSettings, CrosswordData} from "@/app/entities/crossword/crossword";

export enum CrosswordActionType {
    LOAD_START = "LOAD_START",
    LOAD_SUCCESS = "LOAD_SUCCESS",
    LOAD_ERROR = "LOAD_ERROR",
    SELECT_NEW_CELL = "SELECT_NEW_CELL",
    SET_ACTIVE_BY_CLICK = "SET_ACTIVE_BY_CLICK",
    MOVE_TO_NEXT_WORD = "MOVE_TO_NEXT_WORD",
    SET_CELL_VALUE = "SET_CELL_VALUE",
}

export type CrosswordAction =
    | { type: CrosswordActionType.LOAD_START }
    | { type: CrosswordActionType.LOAD_SUCCESS; payload: CrosswordData }
    | { type: CrosswordActionType.LOAD_ERROR }
    | { type: CrosswordActionType.SELECT_NEW_CELL; newRow: number; newCol: number }
    | { type: CrosswordActionType.SET_ACTIVE_BY_CLICK; settings: CellInteractionSettings }
    | { type: CrosswordActionType.MOVE_TO_NEXT_WORD }
    | { type: CrosswordActionType.SET_CELL_VALUE; row: number; col: number; value: string };

