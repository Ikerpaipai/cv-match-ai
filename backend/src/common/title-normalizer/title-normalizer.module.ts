import { Module } from '@nestjs/common';
import { TitleNormalizerService } from './title-normalizer.service';

@Module({
  providers: [TitleNormalizerService],
  exports: [TitleNormalizerService],
})
export class TitleNormalizerModule {}
