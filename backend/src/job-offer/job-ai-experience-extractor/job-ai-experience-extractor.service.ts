import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class JobAiExperienceExtractorService {
  constructor(private readonly geminiService: GeminiService) {}

  async extract(text: string, title: string): Promise<number> {
    const prompt = `
      You are an expert technical recruiter.

      Your only task is to determine the minimum number of years of professional experience required for this job offer.

      Return ONLY valid JSON.
      Do not return markdown, explanations, or any text before or after the JSON.

      Use exactly this structure:

      {
        "experienceYears": 5
      }

      EXPERIENCE EXTRACTION RULES

      1. EXPLICIT EXPERIENCE REQUIREMENTS

      First, look for an explicit number of years of professional experience in the job title and job description.

      Examples:

      - "5+ years of experience" → 5
      - "At least 4 years of experience" → 4
      - "Minimum of 3 years of experience" → 3
      - "3 years of professional experience" → 3
      - "5+ years with React" → 5
      - "3 years working with Node.js" → 3

      If multiple explicit experience requirements are mentioned, return the LOWEST number.

      Example:

      - "5 years of overall experience and 3 years of experience with React" → 3

      2. SENIORITY-BASED EXPERIENCE ESTIMATION

      If NO explicit number of years is mentioned, estimate the minimum professional experience from the seniority level in the job title.

      Use exactly these values:

      - Junior → 1
      - Mid-level → 2
      - Mid level → 2
      - Intermediate → 2
      - Senior → 5
      - Lead → 7
      - Principal → 7

      Examples:

      - "Junior Frontend Developer" → 1
      - "Mid-Level Fullstack Developer" → 2
      - "Intermediate Backend Developer" → 2
      - "Senior Fullstack Developer" → 5
      - "Lead Software Engineer" → 7
      - "Principal Engineer" → 7

      A job title containing "Senior", "Lead", or "Principal" must NOT return 0.

      3. NO EXPERIENCE INFORMATION

      Return 0 ONLY when:

      - no explicit number of years of experience is mentioned; AND
      - no recognized seniority level is present in the job title.

      Examples:

      - "Software Developer" → 0
      - "Fullstack Developer" → 0
      - "Frontend Engineer" → 0

      4. GENERAL RULES

      - experienceYears must always be a non-negative integer.
      - Do not return null.
      - Do not return any additional fields.
      - Do not infer experience from technologies or responsibilities.
      - Return ONLY the JSON object.

      Job title:
      ${title}

      Job description:
      ${text}
    `;

    try {
      const result = await this.geminiService.generate(prompt);

      console.log('EXPERIENCE GEMINI RESPONSE:');
      console.log(result);

      const json: unknown = JSON.parse(result);

      console.log('EXPERIENCE PARSED JSON:');
      console.log(json);

      if (
        typeof json === 'object' &&
        json !== null &&
        'experienceYears' in json &&
        typeof json.experienceYears === 'number' &&
        Number.isFinite(json.experienceYears) &&
        json.experienceYears >= 0
      ) {
        return json.experienceYears;
      }
    } catch (error) {
      console.error('EXPERIENCE EXTRACTION ERROR:', error);
    }

    return this.extractFromTitle(title);
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

    return 0;
  }
}
