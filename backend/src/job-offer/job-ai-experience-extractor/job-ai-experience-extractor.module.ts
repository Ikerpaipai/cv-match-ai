import { Module } from '@nestjs/common';
import { JobAiExperienceExtractorService } from './job-ai-experience-extractor.service';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [GeminiModule],
  providers: [JobAiExperienceExtractorService],
  exports: [JobAiExperienceExtractorService],
})
export class JobAiExperienceExtractorModule {}
