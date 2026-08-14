import { Injectable } from '@nestjs/common';

@Injectable()
export class CvFallbackExtractorService {
  extract(text: string) {
    const technologies = [
      'React',
      'Node.js',
      'NestJS',
      'TypeScript',
      'JavaScript',
    ];

    return {
      name: text.split('\n')[0] ?? '',
      title: text.includes('Fullstack') ? 'Fullstack Developer' : '',
      skills: technologies.filter((tech) => text.includes(tech)),
      experienceYears: this.extractExperience(text),
    };
  }

  private extractExperience(text: string) {
    const match = text.match(/(\d+)\s?(years|ans)/i);

    return match ? Number(match[1]) : 0;
  }
}
