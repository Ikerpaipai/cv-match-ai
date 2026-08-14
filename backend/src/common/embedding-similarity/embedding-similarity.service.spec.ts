import { Test, TestingModule } from '@nestjs/testing';
import { EmbeddingSimilarityService } from './embedding-similarity.service';

describe('EmbeddingSimilarityService', () => {
  let service: EmbeddingSimilarityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbeddingSimilarityService],
    }).compile();

    service = module.get<EmbeddingSimilarityService>(EmbeddingSimilarityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
