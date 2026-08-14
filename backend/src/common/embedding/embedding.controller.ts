import { Controller, Get } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';

@Controller('embedding')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Get('test')
  async test() {
    const embedding = await this.embeddingService.generate(
      'React developer with Node.js and Docker',
    );

    return {
      dimensions: embedding.length,
      preview: embedding.slice(0, 5),
    };
  }
}
