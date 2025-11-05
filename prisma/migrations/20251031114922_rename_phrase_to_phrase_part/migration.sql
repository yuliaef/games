/*
  Warnings:

  - You are about to drop the column `phrase` on the `crossword_sublevels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "crossword_sublevels" DROP COLUMN "phrase",
ADD COLUMN     "phrasePart" TEXT NOT NULL DEFAULT '';
