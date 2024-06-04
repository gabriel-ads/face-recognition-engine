/*
  Warnings:

  - You are about to drop the column `category_id` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `developer_id` on the `Client` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developerId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_developer_id_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "category_id",
DROP COLUMN "developer_id",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "developerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
