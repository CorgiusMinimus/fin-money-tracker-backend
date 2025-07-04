/*
  Warnings:

  - You are about to drop the column `color` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `category` table. All the data in the column will be lost.
  - Added the required column `color_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_id` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "color",
ADD COLUMN     "color_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "category" DROP COLUMN "color",
ADD COLUMN     "color_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;
