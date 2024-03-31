import { useContext } from 'react';

import { useStore } from 'zustand';
import { createStore } from 'zustand';
import { Command, DefaultHandler } from '~/types';

import { TerminalContext } from '../../components/Terminal';
import { defaultPrompt } from '../helpers';

type TerminalState = {
  text: string;
  commands: Command[];
  isExecuting: boolean;
  defaultHandler?: DefaultHandler;
  prompt: React.ReactNode;
};

type TerminalActions = {
  setText: (text: string) => void;
  setIsExecuting: (isExecuting: boolean) => void;
};

export type TerminalStoreProps = TerminalState & TerminalActions;
export type TerminalStore = ReturnType<typeof createTerminalStore>;

export const createTerminalStore = (
  initProps?: Partial<TerminalStoreProps>
) => {
  const DEFAULT_PROPS: TerminalState = {
    text: '',
    commands: [],
    isExecuting: false,
    prompt: defaultPrompt,
  };
  return createStore<TerminalStoreProps>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setText: (text) => set({ text }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),
  }));
};

const useTerminalContext = () => {
  const store = useContext(TerminalContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store);
};

export { useTerminalContext };
