import React from 'react';

import { TerminalOutputValue } from './db';

export type Awaitable<T> = () => Promise<T> | T;

export interface Theme extends Record<string, string> {
  '--terminal-border': string;
  '--terminal-foreground': string;
  '--terminal-background': string;
}

export type ThemeNames = 'poimandres';

export interface TitleBarProps {
  title?: React.ReactNode;
  closeHandler?: Awaitable<void>;
  minimizeHandler?: Awaitable<void>;
  maximizeHandler?: Awaitable<void>;
  extraContent?: React.ReactNode;
}

export interface InputBoxProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  prompt?: React.ReactNode;
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}

export interface Command {
  name: string;
  description?: string;
  usage?: string;
  args?: string[];
  handler: Awaitable<TerminalOutputValue>;
}

export interface TerminalProps extends React.ComponentPropsWithoutRef<'div'> {
  theme?: Theme;
  showTitleBar?: boolean;
  titleBar?: TitleBarProps;
  inputBox?: InputBoxProps;
  commands?: Command[];
}
