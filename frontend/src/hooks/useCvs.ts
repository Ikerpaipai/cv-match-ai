import { useQuery } from '@tanstack/react-query';

import { getCvs } from '../api/cv.api';

export function useCvs() {
  return useQuery({
    queryKey: ['cvs'],
    queryFn: getCvs,
  });
}
