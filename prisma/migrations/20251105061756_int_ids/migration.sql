/*
  Warnings:

  - The primary key for the `crossword_levels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `crossword_levels` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `crossword_sublevels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `crossword_sublevels` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `crosswords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `crosswords` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `levelId` on the `crossword_sublevels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sublevelId` on the `crosswords` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."crossword_sublevels" DROP CONSTRAINT "crossword_sublevels_levelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."crosswords" DROP CONSTRAINT "crosswords_sublevelId_fkey";

-- AlterTable
ALTER TABLE "crossword_levels" DROP CONSTRAINT "crossword_levels_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "crossword_levels_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "crossword_sublevels" DROP CONSTRAINT "crossword_sublevels_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "levelId",
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD CONSTRAINT "crossword_sublevels_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "crosswords" DROP CONSTRAINT "crosswords_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "sublevelId",
ADD COLUMN     "sublevelId" INTEGER NOT NULL,
ADD CONSTRAINT "crosswords_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "crosswords_sublevelId_key" ON "crosswords"("sublevelId");

-- AddForeignKey
ALTER TABLE "crossword_sublevels" ADD CONSTRAINT "crossword_sublevels_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "crossword_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crosswords" ADD CONSTRAINT "crosswords_sublevelId_fkey" FOREIGN KEY ("sublevelId") REFERENCES "crossword_sublevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
