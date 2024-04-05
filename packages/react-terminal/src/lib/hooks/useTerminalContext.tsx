import React from 'react';
import { useContext } from 'react';

import { constructTerminalProps } from '~/lib/helpers/terminal';

import { useStore } from 'zustand';
import { createStore } from 'zustand';
import { TerminalContext } from '~/providers/TerminalProvider';
import { AllRequired, Theme } from '~/types';
import { TerminalProps, TitleBarProps } from '~/types';

import { constructTitlebarProps } from '../helpers/titlebar';

export type TerminalState = AllRequired<TerminalProps> &
  AllRequired<TitleBarProps> & {
    terminalRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    text: string;
    isExecuting: boolean;
    commandIndex: number;
  };

type TerminalActions = {
  setTerminalProps: (props: TerminalProps) => void;
  setTitleBarProps: (props: TitleBarProps) => void;
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
    ...constructTitlebarProps({}),
  };

  return createStore<TerminalStoreProps>()((set) => ({
    ...defaultProps,
    setTerminalProps: (props) => set(props),
    setTitleBarProps: (props) => set(props),
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
