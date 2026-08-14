import { Module } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JobSkillExtractorService } from './job-skill-extractor/job-skill-extractor.service';
import { GeminiModule } from 'src/gemini/gemini.module';
import { JobAiAnalyzerService } from './job-ai-analyzer/job-ai-analyzer.service';
import { TitleNormalizerModule } from 'src/common/title-normalizer/title-normalizer.module';
import { JobAiExperienceExtractorModule } from './job-ai-experience-extractor/job-ai-experience-extractor.module';
import { JobExperienceExtractorService } from './job-experience-extractor/job-experience-extractor.service';

@Module({
  imports: [
    PrismaModule,
    GeminiModule,
    TitleNormalizerModule,
    JobAiExperienceExtractorModule,
  ],
  providers: [
    JobOfferService,
    JobSkillExtractorService,
    JobExperienceExtractorService,
    JobAiAnalyzerService,
  ],
  exports: [
    JobOfferService,
    JobSkillExtractorService,
    JobExperienceExtractorService,
    JobAiAnalyzerService,
  ],
})
export class JobOfferModule {}
