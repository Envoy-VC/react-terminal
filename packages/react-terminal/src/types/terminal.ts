import React from 'react';

export interface Theme extends Record<string, string> {
  'terminal.border': string;
  'terminal.foreground': string;
  'terminal.background': string;
}

export type Awaitable<T> = () => Promise<T> | T;

export type TerminalProps = {
  theme?: Theme;
  welcomeMessage?: React.ReactNode;
  prompt?: React.ReactNode;
  commands: TerminalCommand[];
  showTitleBar?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export type TerminalCommand = {
  name: string;
  params: string[];
  descriptions: string;
  handler: Awaitable<void>;
};
