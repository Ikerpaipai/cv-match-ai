import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }

    const model = this.configService.get<string>('GEMINI_MODEL');

    if (!model) {
      throw new Error('GEMINI_MODEL is missing');
    }

    this.ai = new GoogleGenAI({
      apiKey,
    });
  }

  async generate(prompt: string): Promise<string> {
    console.log('Gemini called');

    try {
      const response = await this.ai.models.generateContent({
        model: this.configService.get<string>('GEMINI_MODEL')!,
        contents: prompt,
      });

      const text = response.text;

      if (!text) {
        throw new InternalServerErrorException(
          'Gemini returned an empty response',
        );
      }

      return text;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      throw new InternalServerErrorException('Service IA indisponible');
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: text,
      });

      const embeddings = response.embeddings;

      if (!embeddings || embeddings.length === 0) {
        throw new InternalServerErrorException('Gemini returned no embedding');
      }

      const values = embeddings[0].values;

      if (!values) {
        throw new InternalServerErrorException(
          'Gemini returned an empty embedding vector',
        );
      }

      return values;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      throw new InternalServerErrorException('Embedding service unavailable');
    }
  }
}
