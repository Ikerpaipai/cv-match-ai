import { Test, TestingModule } from '@nestjs/testing';
import { JobImportController } from './job-import.controller';

describe('JobImportController', () => {
  let controller: JobImportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobImportController],
    }).compile();

    controller = module.get<JobImportController>(JobImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
