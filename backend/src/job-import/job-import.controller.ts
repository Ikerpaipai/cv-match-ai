import { Controller, Post } from '@nestjs/common';
import { JobImportService } from './job-import.service';

@Controller('job-import')
export class JobImportController {
  constructor(private readonly jobImportService: JobImportService) {}

  @Post()
  importJobs() {
    return this.jobImportService.importJobs();
  }
}
