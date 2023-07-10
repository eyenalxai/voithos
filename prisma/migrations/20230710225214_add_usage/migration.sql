/*
  Warnings:

  - You are about to drop the column `chatGPTModel` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `priceUSD` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `tokensCount` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatGPTModel",
DROP COLUMN "createdAt",
DROP COLUMN "priceUSD",
DROP COLUMN "tokensCount";

-- CreateTable
CREATE TABLE "Usage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatGPTModel" "ChatGPTModel" NOT NULL,
    "tokensCount" INTEGER NOT NULL,
    "priceUSD" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usage_id_key" ON "Usage"("id");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
