import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { PdfService } from './pdf.service';
import { CvAnalysisService } from './cv-analysis.service';
import { GeminiModule } from '../gemini/gemini.module';
import { CvFallbackExtractorService } from './cv-fallback-extractor.service';
import { CandidateModule } from 'src/candidate/candidate.module';

@Module({
  imports: [GeminiModule, CandidateModule],
  controllers: [CvController],
  providers: [
    CvService,
    PdfService,
    CvAnalysisService,
    CvFallbackExtractorService,
  ],
})
export class CvModule {}
