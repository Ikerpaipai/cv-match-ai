import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { CandidateModule } from '../candidate/candidate.module';
import { JobOfferModule } from '../job-offer/job-offer.module';
import { MatchingReportService } from './matching-report/matching-report.service';
import { TitleNormalizerModule } from 'src/common/title-normalizer/title-normalizer.module';
import { EmbeddingModule } from 'src/common/embedding/embedding.module';
import { JobMatchModule } from 'src/job-match/job-match.module';

@Module({
  imports: [
    CandidateModule,
    JobOfferModule,
    TitleNormalizerModule,
    EmbeddingModule,
    JobMatchModule,
  ],
  controllers: [MatchingController],
  providers: [MatchingService, MatchingReportService],
})
export class MatchingModule {}
