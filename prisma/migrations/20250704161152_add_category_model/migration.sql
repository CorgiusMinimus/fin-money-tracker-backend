-- DropIndex
DROP INDEX "account_user_id_key";

-- CreateTable
CREATE TABLE "category" (
    "category_id" UUID NOT NULL,
    "user_id" UUID,
    "category_name" TEXT NOT NULL,
    "category_type" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
