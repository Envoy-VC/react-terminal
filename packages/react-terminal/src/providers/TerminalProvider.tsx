import React, { createContext } from 'react';

import {
  TerminalStore,
  createTerminalStore,
} from '~/lib/hooks/useTerminalContext';

export const TerminalContext = createContext<TerminalStore | null>(null);

/**
 * Provides a context for the terminal component.
 *
 * @remarks
 * The `TerminalProvider` component wraps its children with a context provider,
 * allowing access to the terminal store throughout the component tree.
 *
 * @group Providers
 * @param children - The child components to be wrapped by the provider.
 * @returns The `TerminalProvider` component.
 *
 * @example
 * ```tsx
 * <TerminalProvider>
 *   <App />
 * </TerminalProvider>
 * ```
 *
 */
const TerminalProvider = ({ children }: React.PropsWithChildren) => {
  const store = React.useRef(createTerminalStore()).current;

  return (
    <TerminalContext.Provider value={store}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
