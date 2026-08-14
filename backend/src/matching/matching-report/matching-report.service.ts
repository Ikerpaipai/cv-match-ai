import { Injectable } from '@nestjs/common';

type MatchingReport = {
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
};

type MatchingReportInput = {
  matchedRequiredSkills: string[];
  matchedOptionalSkills: string[];
  missingSkills: string[];
  titleScore: number;
  experienceScore: number;
  semanticScore: number;
  globalScore: number;
};

@Injectable()
export class MatchingReportService {
  build({
    matchedRequiredSkills,
    matchedOptionalSkills,
    missingSkills,
    titleScore,
    experienceScore,
    semanticScore,
    globalScore,
  }: MatchingReportInput): MatchingReport {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (matchedRequiredSkills.length > 0) {
      strengths.push(
        `Matches ${matchedRequiredSkills.length} required technical skill(s).`,
      );
    }

    if (matchedOptionalSkills.length > 0) {
      strengths.push(`Bonus skills: ${matchedOptionalSkills.join(', ')}.`);
    }

    if (titleScore === 100) {
      strengths.push('Job title matches the candidate profile.');
    }

    if (experienceScore === 100) {
      strengths.push('Experience requirement satisfied.');
    }

    if (semanticScore >= 0.8) {
      strengths.push(
        `Strong semantic similarity with the job offer (${Math.round(
          semanticScore * 100,
        )}%).`,
      );
    }

    if (globalScore >= 80) {
      strengths.push('Excellent overall compatibility.');
    }

    if (missingSkills.length > 0) {
      weaknesses.push(`Missing required skills: ${missingSkills.join(', ')}.`);
    }

    if (titleScore === 0) {
      weaknesses.push(
        'Job title does not closely match the candidate profile.',
      );
    }

    if (experienceScore < 100) {
      weaknesses.push(
        'Candidate does not fully meet the experience requirement.',
      );
    }

    if (semanticScore < 0.5) {
      weaknesses.push(
        `Low semantic similarity with the job offer (${Math.round(
          semanticScore * 100,
        )}%).`,
      );
    }

    let recommendation = 'Not recommended';

    if (globalScore >= 80) {
      recommendation = 'Highly recommended';
    } else if (globalScore >= 60) {
      recommendation = 'Recommended';
    } else if (globalScore >= 40) {
      recommendation = 'Potential fit';
    }

    return {
      strengths,
      weaknesses,
      recommendation,
    };
  }
}
