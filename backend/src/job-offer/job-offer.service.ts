import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto/create-job-offer.dto';

@Injectable()
export class JobOfferService {
  constructor(private readonly prisma: PrismaService) {}

  private formatVector(vector: number[]): string {
    return `[${vector.join(',')}]`;
  }

  async upsert(data: CreateJobOfferDto) {
    const jobOffer = await this.prisma.jobOffer.upsert({
      where: {
        source_externalId: {
          source: data.source,
          externalId: data.externalId,
        },
      },

      update: {
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        experienceYears: data.experienceYears,
        url: data.url,
        embedding: data.embedding,

        /*
         * L'import initial utilise les extracteurs locaux.
         * Gemini n'a pas encore renforcé cette offre.
         */
        aiAnalyzed: false,

        skills: {
          deleteMany: {},

          create: data.skills.map((skill) => ({
            name: skill.name,
            required: skill.required,
          })),
        },
      },

      create: {
        externalId: data.externalId,
        source: data.source,

        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,

        experienceYears: data.experienceYears,
        url: data.url,

        embedding: data.embedding,

        /*
         * Analyse locale uniquement.
         * Gemini sera utilisé plus tard uniquement
         * si cette offre arrive dans le TOP 5.
         */
        aiAnalyzed: false,

        skills: {
          create: data.skills.map((skill) => ({
            name: skill.name,
            required: skill.required,
          })),
        },
      },
    });

    const vector = this.formatVector(data.embedding);

    await this.prisma.$executeRaw`
      UPDATE "JobOffer"
      SET "embedding_vector" = ${vector}::vector
      WHERE "id" = ${jobOffer.id}
    `;

    return jobOffer;
  }

  async findAll() {
    return this.prisma.jobOffer.findMany({
      include: {
        skills: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByExternalId(source: string, externalId: string) {
    return this.prisma.jobOffer.findUnique({
      where: {
        source_externalId: {
          source,
          externalId,
        },
      },
      include: {
        skills: true,
      },
    });
  }

  async updateAnalysis(
    id: string,
    data: {
      title: string;
      skills: {
        name: string;
        required: boolean;
      }[];
      experienceYears: number;
    },
  ) {
    return this.prisma.jobOffer.update({
      where: {
        id,
      },

      data: {
        title: data.title,
        experienceYears: data.experienceYears,

        /*
         * Cette fois Gemini vient de terminer son analyse.
         */
        aiAnalyzed: true,

        skills: {
          deleteMany: {},

          create: data.skills.map((skill) => ({
            name: skill.name,
            required: skill.required,
          })),
        },
      },

      include: {
        skills: true,
      },
    });
  }
}
