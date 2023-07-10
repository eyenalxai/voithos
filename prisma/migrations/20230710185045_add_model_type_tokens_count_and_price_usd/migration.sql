/*
  Warnings:

  - Added the required column `chatGPTModel` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceUSD` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokensCount` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatGPTModel" AS ENUM ('GPT_3_5_TURBO', 'GPT_4');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "chatGPTModel" "ChatGPTModel" NOT NULL,
ADD COLUMN     "priceUSD" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tokensCount" INTEGER NOT NULL;
