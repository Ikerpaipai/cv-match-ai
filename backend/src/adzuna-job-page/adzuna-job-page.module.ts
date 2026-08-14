import { Module } from '@nestjs/common';
import { AdzunaJobPageService } from './adzuna-job-page.service';

@Module({
  providers: [AdzunaJobPageService],
  exports: [AdzunaJobPageService],
})
export class AdzunaJobPageModule {}
