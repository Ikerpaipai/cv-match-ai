import { Injectable } from '@nestjs/common';
import { TECHNOLOGIES } from './technologies';

type ExtractedSkill = {
  name: string;
  required: boolean;
};

@Injectable()
export class JobSkillExtractorService {
  extract(text: string): ExtractedSkill[] {
    const content = text.toLowerCase();

    return TECHNOLOGIES.filter((tech) =>
      tech.aliases.some((alias) => content.includes(alias.toLowerCase())),
    ).map((tech) => ({
      name: tech.name,
      required: true,
    }));
  }

  normalize(skill: string): string {
    const value = skill.trim().toLowerCase();

    const technology = TECHNOLOGIES.find((tech) =>
      tech.aliases.some((alias) => alias.toLowerCase() === value),
    );

    return technology?.name ?? value;
  }
}
