import { useQuery } from '@tanstack/react-query';

import { getJobMatches } from '../api/jobs.api';

export function useJobMatches(cvId: string | null) {
  return useQuery({
    queryKey: ['jobMatches', cvId],
    queryFn: () => getJobMatches(cvId as string),
    enabled: !!cvId,
  });
}
