/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `JobOffer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JobOffer_url_key" ON "JobOffer"("url");
