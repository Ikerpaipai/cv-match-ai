import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobOfferService } from '../job-offer/job-offer.service';
import { JobAiAnalyzerService } from '../job-offer/job-ai-analyzer/job-ai-analyzer.service';

type JobMatch = {
  id: string;
  externalId: string;
  source: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  experienceYears: number;
  aiAnalyzed: boolean;
  similarity: number;
};

type EnrichedJobMatch = JobMatch & {
  skills: {
    name: string;
    required: boolean;
  }[];
};

@Injectable()
export class JobMatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobOfferService: JobOfferService,
    private readonly jobAiAnalyzer: JobAiAnalyzerService,
  ) {}

  async findAnalyzedMatches(candidateId: string): Promise<EnrichedJobMatch[]> {
    const jobs = await this.prisma.$queryRaw<JobMatch[]>`
      SELECT
        j.id,
        j."externalId",
        j.source,
        j.title,
        j.company,
        j.location,
        j.description,
        j.url,
        j."experienceYears",
        j."aiAnalyzed",
        1 - (
          j."embedding_vector" <=> c."embedding_vector"
        ) AS similarity
      FROM "JobOffer" j
      CROSS JOIN "Candidate" c
      WHERE c.id = ${candidateId}
        AND j."embedding_vector" IS NOT NULL
        AND c."embedding_vector" IS NOT NULL
        AND j."aiAnalyzed" = true
      ORDER BY j."embedding_vector" <=> c."embedding_vector"
    `;

    console.log(`ANALYZED JOBS FOUND: ${jobs.length}`);

    const enrichedJobs: EnrichedJobMatch[] = [];

    for (const job of jobs) {
      const savedJob = await this.jobOfferService.findByExternalId(
        job.source,
        job.externalId,
      );

      if (!savedJob) {
        console.warn(`JOB NOT FOUND: ${job.externalId}`);
        continue;
      }

      enrichedJobs.push({
        ...job,
        title: savedJob.title,
        experienceYears: savedJob.experienceYears,
        skills: savedJob.skills.map((skill) => ({
          name: skill.name,
          required: skill.required,
        })),
      });
    }

    return enrichedJobs;
  }

  async importNewMatches(
    candidateId: string,
    limit: number,
  ): Promise<EnrichedJobMatch[]> {
    const jobs = await this.prisma.$queryRaw<JobMatch[]>`
      SELECT
        j.id,
        j."externalId",
        j.source,
        j.title,
        j.company,
        j.location,
        j.description,
        j.url,
        j."experienceYears",
        j."aiAnalyzed",
        1 - (
          j."embedding_vector" <=> c."embedding_vector"
        ) AS similarity
      FROM "JobOffer" j
      CROSS JOIN "Candidate" c
      WHERE c.id = ${candidateId}
        AND j."embedding_vector" IS NOT NULL
        AND c."embedding_vector" IS NOT NULL
        AND j."aiAnalyzed" = false
      ORDER BY j."embedding_vector" <=> c."embedding_vector"
      LIMIT ${limit}
    `;

    console.log(`NEW JOBS TO ANALYZE: ${jobs.length}`);

    const enrichedJobs: EnrichedJobMatch[] = [];

    for (const job of jobs) {
      console.log(`ENRICHING WITH GEMINI: ${job.title}`);

      const analysis = await this.jobAiAnalyzer.analyze(
        job.title,
        job.description,
      );

      await this.jobOfferService.updateAnalysis(job.id, {
        title: analysis.title,
        skills: analysis.skills,
        experienceYears: analysis.experienceYears,
      });

      enrichedJobs.push({
        ...job,
        title: analysis.title,
        experienceYears: analysis.experienceYears,
        skills: analysis.skills,
        aiAnalyzed: true,
      });
    }

    return enrichedJobs;
  }
}
