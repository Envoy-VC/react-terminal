import React from 'react';

export type Awaitable<T> = () => Promise<T> | T;

export interface Theme extends Record<string, string> {
  '--terminal-border': string;
  '--terminal-foreground': string;
  '--terminal-background': string;
}

/**
 * Title bar Props for the terminal
 *
 * @param title? {@link React.ReactNode} - Title for the terminal
 */
export interface TitleBarProps {
  /**
   * Title for the terminal
   *
   * @default 'React Terminal'
   */
  title?: React.ReactNode;
  /**
   * Callback function for the red button
   */
  closeHandler?: Awaitable<void>;
  /**
   * Callback function for the yellow button
   */
  minimizeHandler?: Awaitable<void>;
  /**
   * Callback function for the green button
   */
  maximizeHandler?: Awaitable<void>;
  /**
   * Extra Content to be added at end of the title bar
   */
  extraContent?: React.ReactNode;
}
export interface TerminalProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Theme for the terminal {@link Theme}
   *
   * @default 'poimandres'
   */
  theme?: Theme;
  /**
   * Whether the terminal should show the title bar
   *
   * @default true
   */
  showTitleBar?: boolean;
  /**
   * Props for the title bar {@link TitleBarProps}
   */
  titleBar?: TitleBarProps;
}
