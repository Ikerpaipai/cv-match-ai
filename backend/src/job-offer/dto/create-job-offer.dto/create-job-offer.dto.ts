import { Skill } from 'src/common/types/skill.type';

export class CreateJobOfferDto {
  externalId!: string;
  source!: string;

  title!: string;
  company!: string;
  location!: string;
  description!: string;
  embedding!: number[];
  skills!: Skill[];

  experienceYears!: number;
  url!: string;
}
