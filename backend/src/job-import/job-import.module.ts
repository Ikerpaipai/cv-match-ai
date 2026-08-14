import { Module } from '@nestjs/common';
import { JobImportService } from './job-import.service';
import { JobOfferModule } from 'src/job-offer/job-offer.module';
import { JobProviderModule } from 'src/job-provider/job-provider.module';
import { JobImportController } from './job-import.controller';
import { EmbeddingModule } from 'src/common/embedding/embedding.module';
import { EmbeddingTextBuilderModule } from 'src/common/embedding-text-builder/embedding-text-builder.module';
import { AdzunaJobPageModule } from 'src/adzuna-job-page/adzuna-job-page.module';

@Module({
  imports: [
    JobOfferModule,
    JobProviderModule,
    EmbeddingModule,
    EmbeddingTextBuilderModule,
    AdzunaJobPageModule,
  ],
  providers: [JobImportService],
  controllers: [JobImportController],
})
export class JobImportModule {}
