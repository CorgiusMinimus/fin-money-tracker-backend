-- CreateTable
CREATE TABLE "color" (
    "color_id" SERIAL NOT NULL,
    "color_name" TEXT NOT NULL,
    "color_hex" TEXT NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("color_id")
);
