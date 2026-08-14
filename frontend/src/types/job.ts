export type JobSkill = {
  name: string;
  required: boolean;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  experienceYears: number;
  url: string;
  skills: JobSkill[];
};

export type JobMatchReport = {
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
};

export type JobMatch = {
  job: Job;
  matchedRequiredSkills: string[];
  matchedOptionalSkills: string[];
  missingSkills: string[];
  skillScore: number;
  titleScore: number;
  experienceScore: number;
  semanticScore: number;
  score: number;
  report: JobMatchReport;
};
