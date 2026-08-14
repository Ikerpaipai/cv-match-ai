import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CandidateModule } from './candidate/candidate.module';
import { JobOfferModule } from './job-offer/job-offer.module';
import { JobImportModule } from './job-import/job-import.module';
import { JobProviderModule } from './job-provider/job-provider.module';
import { MatchingModule } from './matching/matching.module';
import { TitleNormalizerModule } from './common/title-normalizer/title-normalizer.module';
import { EmbeddingModule } from './common/embedding/embedding.module';
import { EmbeddingTextBuilderModule } from './common/embedding-text-builder/embedding-text-builder.module';
import { JobMatchService } from './job-match/job-match.service';
import { JobMatchModule } from './job-match/job-match.module';
import { AdzunaJobPageModule } from './adzuna-job-page/adzuna-job-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CvModule,
    PrismaModule,
    CandidateModule,
    JobOfferModule,
    JobImportModule,
    JobProviderModule,
    MatchingModule,
    TitleNormalizerModule,
    EmbeddingModule,
    EmbeddingTextBuilderModule,
    JobMatchModule,
    AdzunaJobPageModule,
  ],
  controllers: [AppController],
  providers: [AppService, JobMatchService],
})
export class AppModule {}
