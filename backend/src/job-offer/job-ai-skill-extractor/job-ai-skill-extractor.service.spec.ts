import { Test, TestingModule } from '@nestjs/testing';
import { JobAiSkillExtractorService } from './job-ai-skill-extractor.service';

describe('JobAiSkillExtractorService', () => {
  let service: JobAiSkillExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobAiSkillExtractorService],
    }).compile();

    service = module.get<JobAiSkillExtractorService>(JobAiSkillExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
