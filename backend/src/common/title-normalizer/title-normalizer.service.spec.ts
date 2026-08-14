import { Test, TestingModule } from '@nestjs/testing';
import { TitleNormalizerService } from './title-normalizer.service';

describe('TitleNormalizerService', () => {
  let service: TitleNormalizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TitleNormalizerService],
    }).compile();

    service = module.get<TitleNormalizerService>(TitleNormalizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
