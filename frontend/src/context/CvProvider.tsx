import { useState } from 'react';

import { CvContext } from './CvContext';

export function CvProvider({ children }: { children: React.ReactNode }) {
  const [activeCvId, setActiveCvId] = useState<string | null>(null);

  return (
    <CvContext.Provider
      value={{
        activeCvId,
        setActiveCvId,
      }}
    >
      {children}
    </CvContext.Provider>
  );
}
