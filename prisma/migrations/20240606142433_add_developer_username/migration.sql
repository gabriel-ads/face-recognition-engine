/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "token" SET DATA TYPE VARCHAR(500);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_username_key" ON "Developer"("username");
