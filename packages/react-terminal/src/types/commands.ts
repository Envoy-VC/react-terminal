import { Awaitable } from '.';

export type TerminalOutputValue = string | { html: JSX.Element } | undefined;

/**
 * Represents a command handler function.
 *
 * @param args - An array of string arguments passed to the command.
 * @param text - The value of terminal input box
 * @param command - The command being executed
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
  text: string,
  command: Command
) => Promise<TerminalOutputValue> | TerminalOutputValue;

/**
 * Represents a command error handler function.
 *
 * @param error - An error object that occurred during command execution.
 * @param args - An array of string arguments passed to the command.
 * @param text - The value of terminal input box
 * @param command - The command being executed
 *
 * @returns A `Promise` or a value of type `TerminalOutputValue`.
 */
export type CommandErrorHandler = (
  error: unknown,
  args: string[],
  text: string,
  command: Command
) => Promise<TerminalOutputValue> | TerminalOutputValue;

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
  /**
   * A callback function that is called when execution of the command is complete.
   */
  callback?: Awaitable<void>;
};
