import { Injectable } from '@nestjs/common';
import { AdzunaService } from '../job-provider/adzuna/adzuna.service';
import { AdzunaMapper } from '../job-provider/adzuna/adzuna.mapper';
import { JobOfferService } from '../job-offer/job-offer.service';
import { EmbeddingTextBuilderService } from 'src/common/embedding-text-builder/embedding-text-builder.service';
import { EmbeddingService } from 'src/common/embedding/embedding.service';
import { AdzunaJobPageService } from 'src/adzuna-job-page/adzuna-job-page.service';
import { JobSkillExtractorService } from '../job-offer/job-skill-extractor/job-skill-extractor.service';
import { JobExperienceExtractorService } from '../job-offer/job-experience-extractor/job-experience-extractor.service';

@Injectable()
export class JobImportService {
  constructor(
    private readonly adzunaService: AdzunaService,
    private readonly adzunaJobPageService: AdzunaJobPageService,
    private readonly jobSkillExtractor: JobSkillExtractorService,
    private readonly jobExperienceExtractor: JobExperienceExtractorService,
    private readonly jobOfferService: JobOfferService,
    private readonly embeddingTextBuilder: EmbeddingTextBuilderService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  private async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async retry<T>(
    operation: () => Promise<T>,
    retries = 3,
    delay = 5000,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (attempt < retries) {
          console.log(
            `Attempt ${attempt}/${retries} failed. Retrying in ${
              delay / 1000
            }s...`,
          );

          await this.wait(delay);
          delay *= 2;
        }
      }
    }

    throw lastError;
  }

  async importJobs() {
    const queries = [
      'Fullstack',
      'Full Stack',
      'Software Developer',
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
    ];

    const pagesPerQuery = 2;

    let total = 0;
    let imported = 0;
    let updated = 0;

    for (const query of queries) {
      for (let page = 1; page <= pagesPerQuery; page++) {
        console.log('');
        console.log('==============================');
        console.log(`SEARCHING: "${query}"`);
        console.log(`PAGE: ${page}`);
        console.log('==============================');

        const response = await this.retry(() =>
          this.adzunaService.searchJobs(query, page),
        );

        const jobs = response.results.map((job) =>
          AdzunaMapper.toJobOffer(job),
        );

        if (jobs.length === 0) {
          console.log('NO MORE JOBS FOUND FOR THIS QUERY.');
          break;
        }

        for (const job of jobs) {
          total++;

          try {
            const existingJob = await this.jobOfferService.findByExternalId(
              job.source,
              job.externalId,
            );

            if (existingJob) {
              console.log(`UPDATING EXISTING JOB: ${job.title}`);
            } else {
              console.log(`IMPORTING NEW JOB: ${job.title}`);
            }

            // 1. Récupération de la description complète
            const pageResult = await this.retry(() =>
              this.adzunaJobPageService.extractJobDescription(job.url),
            );

            const fullDescription = pageResult ?? job.description;

            console.log(`FULL DESCRIPTION LENGTH: ${fullDescription.length}`);

            // 2. Extraction locale des skills
            const skills = this.jobSkillExtractor.extract(
              `${job.title}\n${fullDescription}`,
            );

            console.log('LOCAL SKILLS:', skills);

            // 3. Extraction locale de l'expérience
            const experienceYears = this.jobExperienceExtractor.extract(
              fullDescription,
              job.title,
            );

            console.log('LOCAL EXPERIENCE YEARS:', experienceYears);

            // 4. Construction du texte pour l'embedding
            const embeddingText = this.embeddingTextBuilder.buildJobOffer({
              title: job.title,
              company: job.company,
              location: job.location,
              description: fullDescription,
            });

            // 5. Génération de l'embedding
            const embedding = await this.retry(() =>
              this.embeddingService.generate(embeddingText),
            );

            console.log(`EMBEDDING GENERATED: ${embedding.length}`);

            // 6. Sauvegarde en base
            await this.retry(() =>
              this.jobOfferService.upsert({
                ...job,
                description: fullDescription,
                skills,
                experienceYears,
                embedding,
              }),
            );

            if (existingJob) {
              updated++;
            } else {
              imported++;
            }

            await this.wait(500);
          } catch (error) {
            console.error(`FAILED TO IMPORT JOB: ${job.externalId}`, error);
          }
        }
      }
    }

    return {
      total,
      imported,
      updated,
    };
  }
}
