-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crossword_levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "phrase" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crossword_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crossword_sublevels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "phrasePart" TEXT NOT NULL DEFAULT '',
    "levelId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crossword_sublevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crosswords" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "sublevelId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crosswords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "crossword_levels_name_key" ON "crossword_levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crossword_sublevels_name_key" ON "crossword_sublevels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crosswords_sublevelId_key" ON "crosswords"("sublevelId");

-- AddForeignKey
ALTER TABLE "crossword_sublevels" ADD CONSTRAINT "crossword_sublevels_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "crossword_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crosswords" ADD CONSTRAINT "crosswords_sublevelId_fkey" FOREIGN KEY ("sublevelId") REFERENCES "crossword_sublevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
