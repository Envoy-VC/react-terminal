import React, { createContext } from 'react';

import {
  TerminalStore,
  createTerminalStore,
} from '~/lib/hooks/useTerminalContext';

export const TerminalContext = createContext<TerminalStore | null>(null);

const TerminalProvider = ({ children }: React.PropsWithChildren) => {
  const store = React.useRef(createTerminalStore({})).current;

  return (
    <TerminalContext.Provider value={store}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
