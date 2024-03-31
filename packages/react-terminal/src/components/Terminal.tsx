import React, { createContext } from 'react';

import {
  TerminalStore,
  createTerminalStore,
} from '~/lib/hooks/useTerminalContext';

import { TerminalProps } from '~/types';

import TerminalContainer from './TerminalContainer';

export const TerminalContext = createContext<TerminalStore | null>(null);

const Terminal = (props: TerminalProps) => {
  const {} = props;
  const store = React.useRef(createTerminalStore()).current;

  return (
    <TerminalContext.Provider value={store}>
      <TerminalContainer {...props} />
    </TerminalContext.Provider>
  );
};

export default Terminal;
