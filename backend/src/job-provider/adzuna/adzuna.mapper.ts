import { AdzunaJob } from './interfaces/adzuna-response.interface';

export class AdzunaMapper {
  static toJobOffer(job: AdzunaJob) {
    return {
      externalId: job.id,
      source: 'adzuna',

      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      description: job.description,
      skills: [],
      url: job.redirect_url,
    };
  }
}
