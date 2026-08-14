import { Test, TestingModule } from '@nestjs/testing';
import { JobImportService } from './job-import.service';

describe('JobImportService', () => {
  let service: JobImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobImportService],
    }).compile();

    service = module.get<JobImportService>(JobImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
