/*
  Warnings:

  - You are about to drop the column `skills` on the `JobOffer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobOffer" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "JobSkill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "JobSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
