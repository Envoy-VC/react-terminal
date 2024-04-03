import React from 'react';

import { TerminalOutputValue } from './db';

/**
 * Represents a function that returns a promise or a value.
 *
 * @typeParam T - The type of the value returned by the function.
 *
 * @returns A promise or a value of type T.
 *
 * @example
 * ```typescript
 * const myFunction: Awaitable<number> = async () => {
 *   const result = await someAsyncOperation();
 *   return result + 1;
 * };
 * ```
 */
export type Awaitable<T> = () => Promise<T> | T;

/**
 * Represents a command handler function.
 *
 * @param args - An array of string arguments passed to the command.
 * @param command - The command being executed.
 * @returns A `Promise` or a value of type `TerminalOutputValue`.
 *
 * @example
 * ```typescript
 * const handleCommand: CommandHandler = async (args, command) => {
 *   // Command handling logic goes here
 * };
 * ```
 */
export type CommandHandler = (
  args: string[],
  command: string
) => Promise<TerminalOutputValue> | TerminalOutputValue;

/**
 * Represents a command error handler function.
 *
 * @param error - An error object that occurred during command execution.
 * @param args - An array of string arguments passed to the command.
 * @param command - The command being executed.
 *
 * @returns A `Promise` or a value of type `TerminalOutputValue`.
 */
export type CommandErrorHandler = (
  error: unknown,
  args: string[],
  command: string
) => Promise<TerminalOutputValue> | TerminalOutputValue;

/**
 * Represents the theme configuration for the terminal.
 */
export type Theme = Record<string, string> & {
  /**
   * The CSS variable for the terminal border color.
   * Example: '--terminal-border'
   */
  '--terminal-border': string;

  /**
   * The CSS variable for the terminal foreground color.
   * Example: '--terminal-foreground'
   */
  '--terminal-foreground': string;

  /**
   * The CSS variable for the terminal background color.
   * Example: '--terminal-background'
   */
  '--terminal-background': string;
};

/**
 * Represents the props for the title bar component.
 */
export interface TitleBarProps {
  /**
   * The header content to be displayed in the title bar.
   *
   * @example
   * ```tsx
   * const titleBar = () => (
   *  return <div className="title-bar">My Title</div>;
   * )
   * ```
   */
  header?: React.ReactNode;

  /**
   * The handler function to be called when the close button is clicked.
   * It should return a promise or be an async function.
   *
   * @example
   * ```ts
   * const closeButton = () => {
   *    console.log('Close button clicked');
   * }
   * ```
   */
  closeHandler?: Awaitable<void>;
  /**
   * The handler function to be called when the minimize button is clicked.
   * It should return a promise or be an async function.
   *
   * @example
   * ```ts
   * const minimizeButton = () => {
   *    console.log('Minimize button clicked');
   * }
   * ```
   */
  minimizeHandler?: Awaitable<void>;

  /**
   * The handler function to be called when the maximize button is clicked.
   * It should return a promise or be an async function.
   *
   * @example
   * ```ts
   * const maximizeButton = () => {
   *   console.log('Maximize button clicked');
   * }
   * ```
   */
  maximizeHandler?: Awaitable<void>;

  /**
   * Additional content to be displayed in the title bar.
   */
  extraContent?: React.ReactNode;
}

/**
 * Represents the props for the input box component.
 */
export interface InputBoxProps {
  /**
   * The prompt to be displayed before the user input.
   */
  prompt?: React.ReactNode;

  /**
   * The cursor style to be used in the input box.
   * It can be one of the following:
   * - 'underscore': A horizontal line cursor.
   * - 'block': A solid block cursor.
   * - 'bar': A vertical bar cursor.
   * - React.ReactNode: A custom cursor component.
   */
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}

/**
 * Represents a command that can be executed in a terminal.
 *
 * @remarks
 * The `Command` interface defines the properties and methods required for a command in a terminal.
 *
 * @example
 * ```typescript
 * const command: Command = {
 *   name: 'ls',
 *   description: 'List files and directories',
 *   usage: 'ls [options] [path]',
 *   args: ['options', 'path'],
 *   waitForExecution: true,
 *   handler: (args, command) => {
 *     // Command execution logic
 *   },
 *   onError: (args, command) => {
 *     // Error handling logic
 *   },
 * };
 * ```
 *
 * @public
 */
export type Command = {
  /**
   * The name of the command.
   */
  name: string;

  /**
   * The description of the command.
   */
  description?: string;

  /**
   * The usage instructions for the command.
   */
  usage?: string;

  /**
   * The arguments required by the command.
   */
  args?: string[];

  /**
   * Specifies whether the command should wait for execution to complete before returning.
   */
  waitForExecution?: boolean;

  /**
   * The handler function that is called when the command is executed.
   *
   * @param args - The command arguments
   * @param command - The command being executed.
   */
  handler: CommandHandler;
  /**
   * The error handler function that is called when an error occurs during command execution.
   *
   * @param args - The command arguments
   * @param command - The command being executed.
   */
  onError?: CommandErrorHandler;
};

/**
 * Represents the props for the HTMLRenderer component.
 */
export interface HTMLRendererProps {
  htmlString: string;
}

/**
 * Represents a function that renders HTML content as a JSX element.
 *
 * @remarks
 * The `HTMLRenderer` function takes an object with an `htmlString` property,
 * which is a string containing the HTML content to be rendered. It returns a
 * JSX element representing the rendered HTML.
 *
 * @example
 * ```tsx
 * const renderHTML: HTMLRenderer = ({ htmlString }) => {
 *   return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
 * };
 * ```
 *
 * @param options - The options for rendering HTML content.
 * @param options.htmlString - The HTML content to be rendered.
 * @returns A JSX element representing the rendered HTML.
 *
 * @see {@link JSX.Element}
 */
export type HTMLRenderer = (props: HTMLRendererProps) => JSX.Element;

/**
 * Represents the props for the Terminal component.
 *
 */
export interface TerminalProps {
  /**
   * The theme for the terminal.
   */
  theme?: Theme;

  /**
   * The font size for the terminal.
   */
  fontSize?: number;

  /**
   * Determines whether to show the title bar or not.
   */
  showTitleBar?: boolean;

  /**
   * The props for the title bar component.
   */
  titleBar?: TitleBarProps;
  /**
   * The props for the title bar component.
   */
  titleBarProps?: React.ComponentPropsWithoutRef<'div'>;
  /**
   * The props for the input box component.
   */
  inputBox?: InputBoxProps;
  /**
   * The props for the input box component.
   */
  inputBoxProps?: React.ComponentPropsWithoutRef<'textarea'>;
  /**
   * The React node to be rendered while a command is executing.
   */
  executingLoader?: React.ReactNode;

  /**
   * An array of commands available in the terminal.
   */
  commands?: Command[];
  /**
   * Whether to enable the default commands or not.
   */
  enableDefaultCommands?: boolean;
  /**
   * The default command handler.
   */
  defaultHandler?: Command;

  /**
   * The HTML renderer for the terminal.
   */
  htmlRenderer?: HTMLRenderer;
}

/**
 * The detailed props for the Terminal component. These props include the props for the `div` element.
 */
export interface TerminalPropsDetailed
  extends TerminalProps,
    React.ComponentPropsWithoutRef<'div'> {}
