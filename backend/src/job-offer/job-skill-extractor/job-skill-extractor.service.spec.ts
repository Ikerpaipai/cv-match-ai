import { Test, TestingModule } from '@nestjs/testing';
import { JobSkillExtractorService } from './job-skill-extractor.service';

describe('JobSkillExtractorService', () => {
  let service: JobSkillExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobSkillExtractorService],
    }).compile();

    service = module.get<JobSkillExtractorService>(JobSkillExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
