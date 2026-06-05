/*
  Warnings:

  - You are about to drop the column `vote_count` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "vote_count",
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "views_count" INTEGER NOT NULL DEFAULT 0;
