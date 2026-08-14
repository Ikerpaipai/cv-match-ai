import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmbeddingModule } from '../common/embedding/embedding.module';
import { EmbeddingTextBuilderModule } from '../common/embedding-text-builder/embedding-text-builder.module';

@Module({
  imports: [PrismaModule, EmbeddingModule, EmbeddingTextBuilderModule],
  providers: [CandidateService],
  exports: [CandidateService],
})
export class CandidateModule {}
