import { Module } from '@nestjs/common';
import { JobMatchService } from './job-match.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JobOfferModule } from '../job-offer/job-offer.module';
import { AdzunaJobPageModule } from '../adzuna-job-page/adzuna-job-page.module';

@Module({
  imports: [PrismaModule, JobOfferModule, AdzunaJobPageModule],
  providers: [JobMatchService],
  exports: [JobMatchService],
})
export class JobMatchModule {}
