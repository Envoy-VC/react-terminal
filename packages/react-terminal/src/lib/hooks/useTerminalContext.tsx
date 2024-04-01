import { useContext } from 'react';

import { useStore } from 'zustand';
import { createStore } from 'zustand';
import { Command } from '~/types';

import { TerminalContext } from '../../components/Terminal';
import { defaultPrompt } from '../helpers';

type TerminalState = {
  text: string;
  fontSize: number;
  commands: Command[];
  isExecuting: boolean;
  executingLoader?: React.ReactNode;
  defaultHandler?: Command;
  prompt: React.ReactNode;
  refocus: boolean;
  commandIndex: number;
};

type TerminalActions = {
  setText: (text: string) => void;
  setIsExecuting: (isExecuting: boolean) => void;
  setRefocus: (refocus: boolean) => void;
  addCommand: (command: Command) => void;
  setCommands: (commands: Command[]) => void;
  setCommandIndex: (commandIndex: number) => void;
};

export type TerminalStoreProps = TerminalState & TerminalActions;
export type TerminalStore = ReturnType<typeof createTerminalStore>;

export const createTerminalStore = (
  initProps?: Partial<TerminalStoreProps>
) => {
  const DEFAULT_PROPS: TerminalState = {
    text: '',
    fontSize: 16,
    commands: [],
    isExecuting: false,
    prompt: defaultPrompt,
    refocus: false,
    commandIndex: -1,
  };
  return createStore<TerminalStoreProps>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setText: (text) => set({ text }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),
    setRefocus: (refocus) => set({ refocus }),
    addCommand: (command) =>
      set((state) => ({ commands: [...state.commands, command] })),
    setCommands: (commands) => set({ commands }),
    setCommandIndex: (commandIndex) => set({ commandIndex }),
  }));
};

const useTerminalContext = () => {
  const store = useContext(TerminalContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store);
};

export { useTerminalContext };
