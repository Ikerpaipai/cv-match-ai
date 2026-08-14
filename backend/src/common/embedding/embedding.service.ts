import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class EmbeddingService {
  constructor(private readonly geminiService: GeminiService) {}

  async generate(text: string): Promise<number[]> {
    return this.geminiService.generateEmbedding(text);
  }
}
