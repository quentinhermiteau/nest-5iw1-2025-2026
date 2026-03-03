/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "publishedAt",
ADD COLUMN     "publicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
