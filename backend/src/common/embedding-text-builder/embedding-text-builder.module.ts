import { Module } from '@nestjs/common';
import { EmbeddingTextBuilderService } from './embedding-text-builder.service';

@Module({
  providers: [EmbeddingTextBuilderService],
  exports: [EmbeddingTextBuilderService],
})
export class EmbeddingTextBuilderModule {}
