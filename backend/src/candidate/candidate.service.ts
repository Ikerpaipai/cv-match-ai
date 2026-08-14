import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingTextBuilderService } from 'src/common/embedding-text-builder/embedding-text-builder.service';
import { EmbeddingService } from 'src/common/embedding/embedding.service';

@Injectable()
export class CandidateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly embeddingTextBuilder: EmbeddingTextBuilderService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  private formatVector(vector: number[]): string {
    return `[${vector.join(',')}]`;
  }

  async create(data: {
    name: string;
    title: string;
    skills: string[];
    experienceYears: number;
  }) {
    const embeddingText = this.embeddingTextBuilder.buildCandidate({
      title: data.title,
      skills: data.skills,
      experienceYears: data.experienceYears,
    });

    console.log(embeddingText);

    const embedding = await this.embeddingService.generate(embeddingText);
    console.log(embedding.length);

    const candidateData = {
      ...data,
      embedding,
    };

    const candidate = await this.prisma.candidate.create({
      data: candidateData,
    });

    const vector = this.formatVector(embedding);

    await this.prisma.$executeRaw`
      UPDATE "Candidate"
      SET "embedding_vector" = ${vector}::vector
      WHERE "id" = ${candidate.id}
    `;

    return {
      id: candidate.id,
      name: candidate.name,
      title: candidate.title,
      skills: candidate.skills,
      experienceYears: candidate.experienceYears,
      createdAt: candidate.createdAt,
    };
  }

  findAll() {
    return this.prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        title: true,
        skills: true,
        experienceYears: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.candidate.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        title: true,
        skills: true,
        experienceYears: true,
        createdAt: true,
      },
    });
  }

  async findOneWithEmbedding(id: string) {
    return this.prisma.candidate.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        title: true,
        skills: true,
        experienceYears: true,
        embedding: true,
        createdAt: true,
      },
    });
  }
}
