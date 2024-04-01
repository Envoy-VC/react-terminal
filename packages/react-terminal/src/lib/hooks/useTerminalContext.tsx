import { useContext } from 'react';

import { useStore } from 'zustand';
import { createStore } from 'zustand';
import { Command, HTMLRenderer, Theme } from '~/types';

import { TerminalContext } from '../../providers/TerminalProvider';
import { defaultPrompt } from '../helpers';
import { themes } from '../themes';

type TerminalState = {
  theme: Theme;
  text: string;
  fontSize: number;
  commands: Command[];
  isExecuting: boolean;
  executingLoader?: React.ReactNode;
  defaultHandler?: Command;
  prompt: React.ReactNode;
  refocus: boolean;
  commandIndex: number;
  htmlRenderer?: HTMLRenderer;
};

type TerminalActions = {
  init: (state: TerminalState) => void;
  setTheme: (theme: Theme) => void;
  setText: (text: string) => void;
  setCommands: (commands: Command[]) => void;
  setIsExecuting: (isExecuting: boolean) => void;
  setRefocus: (refocus: boolean) => void;
  setCommandIndex: (commandIndex: number) => void;
  addCommand: (command: Command) => void;
};

export type TerminalStoreProps = TerminalState & TerminalActions;
export type TerminalStore = ReturnType<typeof createTerminalStore>;

export const createTerminalStore = (
  initProps?: Partial<TerminalStoreProps>
) => {
  const DEFAULT_PROPS: TerminalState = {
    theme: themes.poimandres,
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
    init: (state) => set(state),
    setTheme: (theme) => set({ theme }),
    setText: (text) => set({ text }),
    setCommands: (commands) => set({ commands }),
    setIsExecuting: (isExecuting) => set({ isExecuting }),
    setRefocus: (refocus) => set({ refocus }),
    setCommandIndex: (commandIndex) => set({ commandIndex }),
    addCommand: (command) =>
      set((state) => ({ commands: [...state.commands, command] })),
  }));
};

const useTerminalContext = () => {
  const store = useContext(TerminalContext);
  if (!store) throw new Error('Missing TerminalContext.Provider in the tree');
  return useStore(store);
};

export { useTerminalContext };
