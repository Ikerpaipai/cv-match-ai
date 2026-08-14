export class MatchingResultDto {
  job!: {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    experienceYears: number;
    url: string;
    skills: {
      name: string;
      required: boolean;
    }[];
  };

  matchedRequiredSkills!: string[];
  matchedOptionalSkills!: string[];
  missingSkills!: string[];

  skillScore!: number;
  titleScore!: number;
  experienceScore!: number;
  semanticScore!: number;

  score!: number;

  report!: {
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  };
}
