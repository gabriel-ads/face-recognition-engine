/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_developerId_fkey";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Developer";

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "clientUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" JSONB NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "developerId" INTEGER NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" VARCHAR(500),

    CONSTRAINT "developers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientUserId_key" ON "clients"("clientUserId");

-- CreateIndex
CREATE UNIQUE INDEX "developers_username_key" ON "developers"("username");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
