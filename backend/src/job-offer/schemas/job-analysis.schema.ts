import { z } from 'zod';

export const JobAnalysisSchema = z.object({
  title: z.string(),

  skills: z.array(
    z.object({
      name: z.string(),
      required: z.boolean(),
    }),
  ),

  experienceYears: z.number(),
});
