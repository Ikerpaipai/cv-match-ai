import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { JobSkillExtractorService } from '../job-skill-extractor/job-skill-extractor.service';
import { JobAnalysisSchema } from '../schemas/job-analysis.schema';
import { TitleNormalizerService } from 'src/common/title-normalizer/title-normalizer.service';

@Injectable()
export class JobAiAnalyzerService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly fallbackExtractor: JobSkillExtractorService,
    private readonly titleNormalizer: TitleNormalizerService,
  ) {}

  async analyze(title: string, description: string) {
    try {
      const prompt = `
You are an expert technical recruiter.

Analyze this job offer.

Return ONLY valid JSON.

{
  "title": "Fullstack Developer",
  "skills": [
    {
      "name": "React",
      "required": true
    },
    {
      "name": "Node.js",
      "required": true
    },
    {
      "name": "Docker",
      "required": false
    }
  ],
  "experienceYears": 5
}

RULES FOR TITLE:

- title must contain the normalized job title.
- Do not invent a role that does not exist in the job offer.

Examples:

"Senior Full Stack Engineer"
→ "Fullstack Developer"

".NET Full Stack Developer"
→ "Fullstack Developer"

"Frontend React Engineer"
→ "Frontend Developer"

"Backend Java Developer"
→ "Backend Developer"

RULES FOR SKILLS:

- skills must contain ONLY technical skills.
- Analyze both the job title and the job description.
- Technical skills mentioned in the job title must also be included.
- Do not invent technical skills.
- For each skill, determine if it is required or optional.
- required = true if the job description clearly states that the skill is mandatory.
- required = false if the skill is only preferred, nice to have, a bonus, or optional.

RULES FOR EXPERIENCE:

- experienceYears must be a non-negative integer.

- First look for explicit experience requirements.

Examples:

"5+ years of experience"
→ 5

"At least 4 years of experience"
→ 4

"Minimum of 3 years of experience"
→ 3

"3 years of professional experience"
→ 3

"5+ years with React"
→ 5

"3 years working with Node.js"
→ 3

- If multiple explicit experience requirements exist, return the LOWEST number.

Example:

"5 years of overall experience and 3 years of React"
→ 3

- If there is NO explicit number of years, estimate from the seniority in the job title.

Use exactly these values:

Junior → 1
Mid-level → 2
Mid level → 2
Intermediate → 2
Senior → 5
Lead → 7
Principal → 7

Examples:

"Junior Frontend Developer"
→ 1

"Mid-Level Fullstack Developer"
→ 2

"Intermediate Backend Developer"
→ 2

"Senior Fullstack Developer"
→ 5

"Lead Software Engineer"
→ 7

"Principal Engineer"
→ 7

- A title containing "Senior", "Lead", or "Principal" must NOT return 0.

- Return 0 ONLY when:

  - no explicit number of years is mentioned;
  - AND no recognized seniority level is present in the title.

Examples:

"Software Developer"
→ 0

"Fullstack Developer"
→ 0

"Frontend Engineer"
→ 0

GENERAL RULES:

- experienceYears must always be a non-negative integer.
- Do not infer experience from technologies.
- Do not infer experience from responsibilities.
- Do not return null.
- Do not return additional fields.
- Return ONLY valid JSON.

JOB TITLE:

${title}

JOB DESCRIPTION:

${description}
`;

      const response = await this.geminiService.generate(prompt);

      console.log('JOB AI RESPONSE:');
      console.log(response);

      const json = this.parseJsonResponse(response);

      const analysis = JobAnalysisSchema.parse(json);

      return analysis;
    } catch (error) {
      console.error('JOB AI ANALYSIS ERROR:', error);

      return {
        title: this.titleNormalizer.normalize(title),
        skills: this.fallbackExtractor.extract(`${title}\n${description}`),
        experienceYears: this.extractExperienceFromTitle(title),
      };
    }
  }

  private parseJsonResponse(response: string): unknown {
    const cleanedResponse = response
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(cleanedResponse);
  }

  private extractExperienceFromTitle(title: string): number {
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
