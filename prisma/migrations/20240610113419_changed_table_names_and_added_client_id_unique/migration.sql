/*
  Warnings:

  - A unique constraint covering the columns `[clientUserId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_clientUserId_key" ON "Client"("clientUserId");
