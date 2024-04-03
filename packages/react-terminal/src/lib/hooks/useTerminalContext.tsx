import React from 'react';
import { useContext } from 'react';

import { constructTerminalProps } from '~/lib/helpers';

import { useStore } from 'zustand';
import { createStore } from 'zustand';
import { TerminalContext } from '~/providers/TerminalProvider';
import { AllRequired, TerminalProps, Theme } from '~/types';

export type TerminalState = AllRequired<TerminalProps> & {
  terminalRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  isExecuting: boolean;
  commandIndex: number;
};

type TerminalActions = {
  init: (state: TerminalState) => void;
  setText: (text: string) => void;
  setIsExecuting: (isExecuting: boolean) => void;
  setCommandIndex: (commandIndex: number) => void;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: number) => void;
};

export type TerminalStoreProps = TerminalState & TerminalActions;
export type TerminalStore = ReturnType<typeof createTerminalStore>;

export const createTerminalStore = () => {
  const defaultProps: TerminalState = {
    terminalRef: React.createRef<HTMLDivElement>(),
    inputRef: React.createRef<HTMLTextAreaElement>(),
    text: '',
    isExecuting: false,
    commandIndex: -1,
    ...constructTerminalProps({}),
  };

  return createStore<TerminalStoreProps>()((set) => ({
    ...defaultProps,
    init: (state) => set(state),
    setText: (text) => set({ text }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),
    setCommandIndex: (commandIndex) => set({ commandIndex }),
    setTheme: (theme) => set({ theme }),
    setFontSize: (fontSize) => set({ fontSize }),
  }));
};

const useTerminalContext = () => {
  const store = useContext(TerminalContext);
  if (!store) throw new Error('Missing TerminalContext.Provider in the tree');
  return useStore(store);
};

export { useTerminalContext };
