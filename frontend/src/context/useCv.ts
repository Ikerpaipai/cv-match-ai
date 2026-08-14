import { useContext } from 'react';

import { CvContext } from './CvContext';

export function useCv() {
  const context = useContext(CvContext);

  if (!context) {
    throw new Error('useCv must be used inside CvProvider');
  }

  return context;
}
