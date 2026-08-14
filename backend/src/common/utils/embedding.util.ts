import { Prisma } from '@prisma/client';

function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'number')
  );
}

export function jsonToEmbedding(value: Prisma.JsonValue | null): number[] {
  if (value === null) {
    throw new Error('Embedding is null');
  }

  if (!isNumberArray(value)) {
    throw new Error('Embedding must be an array of numbers');
  }

  return value;
}
