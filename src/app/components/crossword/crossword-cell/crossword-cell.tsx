"use client";

import React from "react";
import {Cell} from "@/app/entities/crossword/cell";
import {Point} from "@/app/entities/crossword/point";
import styles from './crossword-cell.module.scss';
import clsx from "clsx";

interface Props {
  value: string;
  cell: Cell | undefined;
  orientation: "across" | "down" | string;
  firstCellsOfWords: Point[];
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export default function CrosswordCell({ value, cell, orientation, firstCellsOfWords, onKeyDown, onClick, inputRef }: Props) {
  if (!cell || cell.wordIndexes.length === 0) {
    return <div
        className={clsx(
            styles["crossword__ceil"],
            styles["crossword__ceil--blocked"]
        )}
    >
      <div className={styles["crossword__inner"]}/>
    </div>;
  }

  const isFirstCell = firstCellsOfWords.some((p) => p.row === cell.row && p.col === cell.col);
  const number = isFirstCell ? firstCellsOfWords.findIndex((p) => p.row === cell.row && p.col === cell.col) + 1 : undefined;

  return (
      <div
          className={clsx(
              styles["crossword__ceil"],
              styles["crossword__ceil--playable"]
          )}
      >
        <div className={styles["crossword__inner"]}>
          <input
              autoComplete="off"
              type="text"
              maxLength={1}
              className={clsx(
                  styles["crossword__input"],
                  "text-bold_medium",
                  cell.isCorrect && styles["letter-correct"],
                  cell.isIncorrect && styles["letter-incorrect"],
                  cell.isActive && styles["active-cell"]
              )}
              ref={inputRef}
              value={value ?? ""}
              onKeyDown={onKeyDown}
              onClick={onClick}
              onChange={() => {
              }}
          />
          <span className={styles["crossword__number"]}>{number ?? ""}</span>
        </div>
      </div>
  );
}


