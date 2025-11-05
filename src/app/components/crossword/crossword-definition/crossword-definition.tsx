"use client";

import React from "react";
import {Definition} from "@/app/entities/crossword/definition";
import clsx from "clsx";
import styles from "./crossword-definition.module.scss";

interface Props {
    definition: Definition | undefined;
    onClick?: (definition: Definition) => void;
}

export default function CrosswordDefinition({ definition, onClick }: Props) {
    if (!definition) return null;

    return (
        <button
            type="button"
            className={clsx(
                styles["crossword__definition"],
                definition.isDone && styles["definition-done"]
            )}
            onClick={() => onClick?.(definition)}
        >
            {definition.number}. {definition.clue}
        </button>
    );
}

