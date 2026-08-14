CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE "Candidate"
ADD COLUMN "embedding_vector" vector(3072);

ALTER TABLE "JobOffer"
ADD COLUMN "embedding_vector" vector(3072);