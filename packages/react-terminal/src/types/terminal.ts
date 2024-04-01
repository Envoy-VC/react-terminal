import React from 'react';

import { TerminalOutputValue } from './db';

export type Awaitable<T> = () => Promise<T> | T;

export type CommandHandler = (
  args: string[],
  command: string
) => Promise<TerminalOutputValue> | TerminalOutputValue;

export interface Theme extends Record<string, string> {
  '--terminal-border': string;
  '--terminal-foreground': string;
  '--terminal-background': string;
}

export interface TitleBarProps {
  header?: React.ReactNode;
  closeHandler?: Awaitable<void>;
  minimizeHandler?: Awaitable<void>;
  maximizeHandler?: Awaitable<void>;
  extraContent?: React.ReactNode;
}

export interface InputBoxProps {
  prompt?: React.ReactNode;
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}

export interface Command {
  name: string;
  description?: string;
  usage?: string;
  args?: string[];
  waitForExecution?: boolean;
  handler: CommandHandler;
  onError?: CommandHandler;
}

export interface TerminalProps {
  theme?: Theme;
  fontSize?: number;
  showTitleBar?: boolean;
  titleBar?: TitleBarProps;
  inputBox?: InputBoxProps;
  executingLoader?: React.ReactNode;
  commands?: Command[];
  defaultHandler?: Command;
}
