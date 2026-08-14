import { createContext } from 'react';

export type CvContextType = {
  activeCvId: string | null;
  setActiveCvId: (id: string) => void;
};

export const CvContext = createContext<CvContextType | undefined>(undefined);
