import { useMutation } from '@tanstack/react-query';

import { uploadCv } from '../api/cv.api';

export function useUploadCv() {
  return useMutation({
    mutationFn: uploadCv,
  });
}
