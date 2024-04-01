import React, { createContext } from 'react';

import { defaultPrompt } from '~/lib/helpers';
import {
  TerminalStore,
  createTerminalStore,
} from '~/lib/hooks/useTerminalContext';

import { TerminalProps } from '~/types';

import TerminalContainer from './TerminalContainer';

export const TerminalContext = createContext<TerminalStore | null>(null);

const Terminal = (props: TerminalProps) => {
  const { fontSize, commands, defaultHandler, inputBox, executingLoader } =
    props;

  const store = React.useRef(
    createTerminalStore({
      commands: commands ?? [],
      defaultHandler,
      prompt: inputBox?.prompt ?? defaultPrompt,
      executingLoader,
      fontSize: fontSize ?? 16,
    })
  ).current;

  return (
    <TerminalContext.Provider value={store}>
      <TerminalContainer {...props} />
    </TerminalContext.Provider>
  );
};

export default Terminal;
