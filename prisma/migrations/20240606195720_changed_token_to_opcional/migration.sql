/*
  Warnings:

  - Added the required column `clientUserId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "clientUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Developer" ALTER COLUMN "token" DROP NOT NULL;
