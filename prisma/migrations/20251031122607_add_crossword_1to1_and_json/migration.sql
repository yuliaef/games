-- CreateTable
CREATE TABLE "crosswords" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "sublevelId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crosswords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crosswords_sublevelId_key" ON "crosswords"("sublevelId");

-- AddForeignKey
ALTER TABLE "crosswords" ADD CONSTRAINT "crosswords_sublevelId_fkey" FOREIGN KEY ("sublevelId") REFERENCES "crossword_sublevels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
