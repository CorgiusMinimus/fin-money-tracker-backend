/*
  Warnings:

  - You are about to drop the column `category_type` on the `category` table. All the data in the column will be lost.
  - Added the required column `category_type_id` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "category_type",
ADD COLUMN     "category_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "category_type" (
    "category_type_id" SERIAL NOT NULL,
    "category_type_name" TEXT NOT NULL,

    CONSTRAINT "category_type_pkey" PRIMARY KEY ("category_type_id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_category_type_id_fkey" FOREIGN KEY ("category_type_id") REFERENCES "category_type"("category_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
