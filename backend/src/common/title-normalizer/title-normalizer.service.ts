import { Injectable } from '@nestjs/common';

@Injectable()
export class TitleNormalizerService {
  private readonly mappings = [
    {
      normalized: 'Fullstack Developer',
      aliases: [
        'full stack',
        'full-stack',
        'fullstack',
        'full stack engineer',
        'full-stack engineer',
        'full stack developer',
        'full-stack developer',
      ],
    },

    {
      normalized: 'Backend Developer',
      aliases: [
        'backend',
        'back end',
        'backend developer',
        'node developer',
        'node.js developer',
        'java developer',
        'spring developer',
        'nestjs developer',
        'api developer',
      ],
    },

    {
      normalized: 'Frontend Developer',
      aliases: [
        'frontend',
        'front end',
        'frontend developer',
        'front-end developer',
        'react developer',
        'angular developer',
        'vue developer',
        'ui developer',
      ],
    },

    {
      normalized: 'DevOps Engineer',
      aliases: [
        'devops',
        'devops engineer',
        'platform engineer',
        'cloud engineer',
      ],
    },
  ];

  normalize(title: string): string {
    const value = title
      .toLowerCase()
      .replace(/[()[\],/]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const mapping = this.mappings.find((mapping) =>
      mapping.aliases.some((alias) => value.includes(alias)),
    );

    return mapping?.normalized ?? title;
  }
}
