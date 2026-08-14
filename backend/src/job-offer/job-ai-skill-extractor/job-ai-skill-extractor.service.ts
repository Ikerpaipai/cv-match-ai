import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';
import { JobSkillExtractorService } from '../job-skill-extractor/job-skill-extractor.service';
import { JobSkillsSchema } from '../schemas/job-skills.schema';
import { Skill } from 'src/common/types/skill.type';

@Injectable()
export class JobAiSkillExtractorService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly fallbackExtractor: JobSkillExtractorService,
  ) {}

  async extract(text: string): Promise<Skill[]> {
    try {
      const prompt = `
        You are an expert technical recruiter.
        
        Extract ONLY the technical skills from this job description.
        
        Return ONLY valid JSON.
        
        Example:
        
        {
          "skills": [
            {
              "name": "React",
              "required": true
            },
            {
              "name": "Docker",
              "required": false
            }
          ]
        }
        
        Job description:
        
        ${text}
      `;

      const result = await this.geminiService.generate(prompt);

      const json: unknown = JSON.parse(result);

      return JobSkillsSchema.parse(json).skills;
    } catch (error) {
      console.error('Gemini unavailable, using fallback extractor', error);

      return this.fallbackExtractor.extract(text);
    }

    // On continuera ici à l'étape suivante
  }
}
