import { useMutation } from '@tanstack/react-query';
import { importMatches } from '../api/jobs.api';

export function useImportMatches() {
  return useMutation({
    mutationFn: ({ candidateId, limit }: { candidateId: string; limit?: number }) =>
      importMatches(candidateId, limit),
  });
}
