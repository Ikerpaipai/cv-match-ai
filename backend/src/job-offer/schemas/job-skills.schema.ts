import { z } from 'zod';

export const JobSkillsSchema = z.object({
  skills: z.array(
    z.object({
      name: z.string(),
      required: z.boolean(),
    }),
  ),
});
