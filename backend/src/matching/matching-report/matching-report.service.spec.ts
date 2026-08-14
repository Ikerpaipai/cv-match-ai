import { Test, TestingModule } from '@nestjs/testing';
import { MatchingReportService } from './matching-report.service';

describe('MatchingReportService', () => {
  let service: MatchingReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchingReportService],
    }).compile();

    service = module.get<MatchingReportService>(MatchingReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
