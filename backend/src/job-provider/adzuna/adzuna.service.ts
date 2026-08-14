import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AdzunaResponse } from './interfaces/adzuna-response.interface';

@Injectable()
export class AdzunaService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private getBaseUrl(page: number) {
    const appId = this.config.get<string>('ADZUNA_APP_ID');
    const appKey = this.config.get<string>('ADZUNA_APP_KEY');

    return `https://api.adzuna.com/v1/api/jobs/au/search/${page}?app_id=${appId}&app_key=${appKey}`;
  }

  async searchJobs(query: string, page: number) {
    const url = `${this.getBaseUrl(page)}&results_per_page=50&what=${encodeURIComponent(query)}`;

    console.log('ADZUNA URL:', url);
    console.log('ADZUNA QUERY:', query);
    console.log('ADZUNA PAGE:', page);

    const response = await firstValueFrom(this.http.get<AdzunaResponse>(url));

    console.log('ADZUNA RESULTS RECEIVED:', response.data.results.length);

    return response.data;
  }
}
