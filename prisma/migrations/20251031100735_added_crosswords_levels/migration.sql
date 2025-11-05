-- CreateTable
CREATE TABLE "crossword_levels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crossword_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crossword_sublevels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "phrase" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crossword_sublevels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crossword_levels_name_key" ON "crossword_levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crossword_sublevels_name_key" ON "crossword_sublevels"("name");

-- AddForeignKey
ALTER TABLE "crossword_sublevels" ADD CONSTRAINT "crossword_sublevels_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "crossword_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
