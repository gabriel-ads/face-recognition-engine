/*
  Warnings:

  - Added the required column `name` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "name" VARCHAR(255) NOT NULL;
