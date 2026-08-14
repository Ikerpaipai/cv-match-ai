import { Test, TestingModule } from '@nestjs/testing';
import { JobAiAnalyzerService } from './job-ai-analyzer.service';

describe('JobAiAnalyzerService', () => {
  let service: JobAiAnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobAiAnalyzerService],
    }).compile();

    service = module.get<JobAiAnalyzerService>(JobAiAnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
