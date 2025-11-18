"use server";

import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";

export async function completeCrosswordSublevel(sublevelId: number) {
    try {
        const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
        const result = await crosswordController.completeSublevel(sublevelId);
        // TODO complete level if it is the last sublevel
        if (!result.hasNextSublevel) {

        }

        return result;
    } catch (error) {
        console.error("Error completing sublevel:", error);
        throw error;
    }
}

/**
 * Получает информацию о подуровне (включая phrasePart)
 */
export async function getSublevelInfo(sublevelId: number) {
    try {
        const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
        const sublevel = await crosswordController.getSublevelById(sublevelId);

        return {
            id: sublevel.id,
            name: sublevel.name,
            completed: sublevel.completed,
            locked: sublevel.locked,
            phrasePart: sublevel.phrasePart,
            levelId: sublevel.levelId,
        };
    } catch (error) {
        console.error("Error getting sublevel info:", error);
        throw error;
    }
}

export async function getLevelInfo(levelId: number) {
    try {
        const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
        return await crosswordController.getLevelById(levelId);
    } catch (error) {
        console.error("Error getting level info:", error);
        throw error;
    }
}

export async function getSublevelsInfo(levelId: number) {
    try {
        const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
        return await crosswordController.listSublevels(levelId);
    } catch (error) {
        console.error("Error getting level info:", error);
        throw error;
    }
}


