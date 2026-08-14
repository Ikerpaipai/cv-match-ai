/*
  Warnings:

  - A unique constraint covering the columns `[source,externalId]` on the table `JobOffer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "JobOffer_url_key";

-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "experienceYears" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobOffer_source_externalId_key" ON "JobOffer"("source", "externalId");
