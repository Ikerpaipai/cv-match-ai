import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbeddingSimilarityService {
  similarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have the same length.');
    }

    const dot = this.dotProduct(vectorA, vectorB);

    const magnitudeA = this.magnitude(vectorA);
    const magnitudeB = this.magnitude(vectorB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dot / (magnitudeA * magnitudeB);
  }

  private dotProduct(vectorA: number[], vectorB: number[]): number {
    let result = 0;

    for (let i = 0; i < vectorA.length; i++) {
      result += vectorA[i] * vectorB[i];
    }

    return result;
  }

  private magnitude(vector: number[]): number {
    let result = 0;
    for (let i = 0; i < vector.length; i++) {
      result += Math.pow(vector[i], 2);
    }
    return Math.sqrt(result);
  }
}
