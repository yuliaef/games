"use server";

import { getInjection } from "@/di/container";
import { ICrosswordController } from "@/core/controllers/crossword.controller";

/**
 * Отмечает подуровень как завершенный и разблокирует следующий подуровень
 */
export async function completeCrosswordSublevel(sublevelId: number) {
    try {
        const crosswordController = getInjection('ICrosswordController') as ICrosswordController;
        return await crosswordController.completeSublevel(sublevelId);
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


