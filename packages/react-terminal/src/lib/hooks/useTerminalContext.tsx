import { useContext } from 'react';

import { useStore } from 'zustand';
import { createStore } from 'zustand';
import { Command } from '~/types';

import { TerminalContext } from '../../components/Terminal';
import { defaultPrompt } from '../helpers';

type TerminalState = {
  text: string;
  commands: Command[];
  isExecuting: boolean;
  defaultHandler?: Command;
  prompt: React.ReactNode;
  refocus: boolean;
};

type TerminalActions = {
  setText: (text: string) => void;
  setIsExecuting: (isExecuting: boolean) => void;
  setRefocus: (refocus: boolean) => void;
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
    refocus: false,
  };
  return createStore<TerminalStoreProps>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setText: (text) => set({ text }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),
    setRefocus: (refocus) => set({ refocus }),
  }));
};

const useTerminalContext = () => {
  const store = useContext(TerminalContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store);
};

export { useTerminalContext };
