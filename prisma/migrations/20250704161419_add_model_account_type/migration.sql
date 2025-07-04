/*
  Warnings:

  - You are about to drop the column `account_type` on the `account` table. All the data in the column will be lost.
  - Added the required column `account_type_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "account_type",
ADD COLUMN     "account_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "account_type" (
    "account_type_id" SERIAL NOT NULL,
    "account_type_name" TEXT NOT NULL,

    CONSTRAINT "account_type_pkey" PRIMARY KEY ("account_type_id")
);

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_account_type_id_fkey" FOREIGN KEY ("account_type_id") REFERENCES "account_type"("account_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
