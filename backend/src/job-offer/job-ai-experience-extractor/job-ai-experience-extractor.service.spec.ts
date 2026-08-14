import { Test, TestingModule } from '@nestjs/testing';
import { JobAiExperienceExtractorService } from './job-ai-experience-extractor.service';

describe('JobAiExperienceExtractorService', () => {
  let service: JobAiExperienceExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobAiExperienceExtractorService],
    }).compile();

    service = module.get<JobAiExperienceExtractorService>(JobAiExperienceExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
