import { Module } from '@nestjs/common';
import { GeminiModule } from 'src/gemini/gemini.module';
import { EmbeddingService } from './embedding.service';
import { EmbeddingController } from './embedding.controller';
import { EmbeddingSimilarityService } from '../embedding-similarity/embedding-similarity.service';

@Module({
  imports: [GeminiModule],
  providers: [EmbeddingService, EmbeddingSimilarityService],
  exports: [EmbeddingService, EmbeddingSimilarityService],
  controllers: [EmbeddingController],
})
export class EmbeddingModule {}
