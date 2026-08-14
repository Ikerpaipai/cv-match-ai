import { z } from 'zod';

export const CvAnalysisSchema = z.object({
  name: z.string(),
  title: z.string(),
  skills: z.array(z.string()),
  experienceYears: z.number(),
});

export type CvAnalysis = z.infer<typeof CvAnalysisSchema>;
