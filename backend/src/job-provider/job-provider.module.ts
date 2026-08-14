import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdzunaService } from './adzuna/adzuna.service';

@Module({
  imports: [HttpModule],
  providers: [AdzunaService],
  exports: [AdzunaService],
})
export class JobProviderModule {}
