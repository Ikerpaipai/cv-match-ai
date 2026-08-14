import { Injectable } from '@nestjs/common';

export type CandidateEmbeddingInput = {
  title: string;
  skills: string[];
  experienceYears: number;
};

export type JobOfferEmbeddingInput = {
  title: string;
  company: string;
  location: string;
  description: string;
};

@Injectable()
export class EmbeddingTextBuilderService {
  private formatSkills(skills: string[]): string {
    return skills.map((skill) => `- ${skill}`).join('\n');
  }

  buildCandidate(data: CandidateEmbeddingInput): string {
    return `
      Candidate Profile

      Title:
      ${data.title}

      Technical skills:
      ${this.formatSkills(data.skills)}

      Professional experience:
      ${data.experienceYears} years
    `.trim();
  }

  buildJobOffer(data: JobOfferEmbeddingInput): string {
    return `
      Job Offer

      Title:
      ${data.title}

      Company:
      ${data.company}

      Location:
      ${data.location}

      Description:
      ${data.description}
    `.trim();
  }
}
