import { useContext } from 'react';

import { useStore } from 'zustand';
import { createStore } from 'zustand';

import { TerminalContext } from '../../components/Terminal';

type TerminalState = {
  text: string;
};

type TerminalActions = {
  setText: (text: string) => void;
};

export type TerminalStoreProps = TerminalState & TerminalActions;
export type TerminalStore = ReturnType<typeof createTerminalStore>;

export const createTerminalStore = (
  initProps?: Partial<TerminalStoreProps>
) => {
  const DEFAULT_PROPS: TerminalState = {
    text: '',
  };
  return createStore<TerminalStoreProps>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setText: (text) => set({ text }),
  }));
};

const useTerminalContext = () => {
  const store = useContext(TerminalContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store);
};

export { useTerminalContext };
