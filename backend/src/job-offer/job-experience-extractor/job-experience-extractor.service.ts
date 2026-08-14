import { Injectable } from '@nestjs/common';

@Injectable()
export class JobExperienceExtractorService {
  extract(text: string, title: string): number {
    const explicitExperience = this.extractExplicitExperience(
      `${title}\n${text}`,
    );

    if (explicitExperience !== null) {
      return explicitExperience;
    }

    return this.extractFromTitle(title);
  }

  private extractExplicitExperience(text: string): number | null {
    const normalizedText = text.toLowerCase();

    const patterns = [
      /(\d+)\s*\+?\s*years?\s+(?:of\s+)?experience/g,
      /(\d+)\s*\+?\s*years?\s+of\s+professional\s+experience/g,
      /(\d+)\s*\+?\s*years?\s+working\s+with/g,
      /minimum\s+of\s+(\d+)\s+years?/g,
      /at\s+least\s+(\d+)\s+years?/g,
    ];

    const values: number[] = [];

    for (const pattern of patterns) {
      const matches = normalizedText.matchAll(pattern);

      for (const match of matches) {
        const years = Number(match[1]);

        if (Number.isFinite(years) && years >= 0) {
          values.push(years);
        }
      }
    }

    if (values.length === 0) {
      return null;
    }

    return Math.min(...values);
  }

  private extractFromTitle(title: string): number {
    const normalizedTitle = title.toLowerCase().trim();

    if (
      normalizedTitle.includes('principal') ||
      normalizedTitle.includes('lead')
    ) {
      return 7;
    }

    if (normalizedTitle.includes('senior')) {
      return 5;
    }

    if (
      normalizedTitle.includes('mid-level') ||
      normalizedTitle.includes('mid level') ||
      normalizedTitle.includes('intermediate')
    ) {
      return 2;
    }

    if (normalizedTitle.includes('junior')) {
      return 1;
    }

    return 0;
  }
}
