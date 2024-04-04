import { db } from '~/lib/db';
import { fallbackHandler, safeRenderToString } from '~/lib/helpers';
import { useTerminalContext } from '~/lib/hooks';

import { useLocalStorage } from 'usehooks-ts';
import { Command, TerminalOutputValue } from '~/types';

/**
 * Custom hook that provides functionality for handling commands in a terminal.
 *
 * @group Hooks
 *
 * @remarks
 * This hook is used to manage commands, execute them, and handle their results in a terminal-like environment.
 *
 * @returns An object containing various functions and data related to command handling.
 *
 * @example
 * ```tsx
 * const {
 *   lastCursor,
 *   defaultCommands,
 *   setLastCursor,
 *   clearTerminal,
 *   executeCommand,
 *   getCommand,
 *   addCommand,
 *   setCommands,
 * } = useCommands();
 * ```
 *
 * @see {@link Command}
 */
const useCommands = () => {
  const {
    text,
    commands,
    defaultHandler,
    disableDefaultCommands,
    setIsExecuting,
    setText,
    setShowWelcomeMessage,
  } = useTerminalContext();

  const [lastCursor, setLastCursor] = useLocalStorage('lastCursor', 0);

  /**
   * Clears the terminal by updating the last cursor position and returning undefined.
   *
   * @example
   * ```tsx
   * const clear = async () => {
   *   await clearTerminal();
   * };
   * ```
   *
   * @see {@link db.history.count}
   */
  const clearTerminal = async () => {
    setShowWelcomeMessage(false);
    const last = await db.history.count();
    setLastCursor(last);
    return undefined;
  };

  const defaultCommands: Command[] = [
    {
      name: 'clear',
      handler: clearTerminal,
      waitForExecution: false,
    },
  ];

  /**
   * Retrieves the appropriate command handler based on the provided text.
   * If no matching command is found, it falls back to the default handler or the fallback handler.

   *
   * @param text - The input text representing the command.
   * @returns The command handler function.
   *
   *
   * @example
   * ```tsx
   * const commandText = 'run';
   * const commandHandler = getCommand(commandText);
   * ```
   *
   * @see {@link Command}
   */
  const getCommand = (text: string) => {
    const commandValue = text.trim();
    const terminalCommands = [
      ...commands,
      ...(disableDefaultCommands ? [] : defaultCommands),
    ];
    const command = terminalCommands
      .filter((c) => {
        const regex = new RegExp(`^${c.name}( |$)`);
        return regex.test(commandValue);
      })
      .at(0);

    return command ?? defaultHandler ?? fallbackHandler;
  };

  const handler = async () => {
    if (text === '') return;
    const command = getCommand(text);
    await executeCommand(text, command);
  };

  /**
   * Executes a command with the given text and command object.
   *
   * @param text - The input text for the command.
   * @param command - The command object containing the handler and other properties.
   * @returns A Promise that resolves when the command execution is complete.
   *
   * @example
   * ```tsx
   * const command: Command = {
   *   name: 'example',
   *   handler: async (args, commandValue) => {
   *     // Command handler logic
   *   },
   * };
   *
   * await executeCommand('example arg1 arg2', command);
   * ```
   *
   * @see Command
   */
  const executeCommand = async (
    text: string,
    command: Command
  ): Promise<void> => {
    const commandValue = text.trim();
    const waitForExecution = command.waitForExecution ?? false;
    const args = commandValue.replace(command.name, '').split(' ').splice(1);

    try {
      if (waitForExecution) {
        setIsExecuting(true);
      }

      if (!waitForExecution) {
        setIsExecuting(false);
        await db.history.add({
          type: 'command',
          value: commandValue,
        });
        setText('');
      }

      const result = await command.handler(args, commandValue);

      if (waitForExecution) {
        await db.history.add({
          type: 'command',
          value: commandValue,
        });
      }

      await writeToTerminal(result);

      if (waitForExecution) {
        setIsExecuting(false);
        setText('');
      }
    } catch (error) {
      if (command.onError) {
        await command.onError(error, args, commandValue);
      } else {
        await db.history.add({
          type: 'output',
          value: `Error: ${(error as Error).message}`,
        });
      }
      setIsExecuting(false);
      setText('');
    }
  };

  /**
   * This function adds the provided value to the terminal history. If the value is a string, it is added directly. If the value is an object, the `html` property of the object is converted to a string using `safeRenderToString` function before adding it to the history.
   *
   * @param value - The value to be written to the terminal.
   *
   * @example
   * // Writing a string value
   * const outputValue = 'Hello, world!';
   * await writeToTerminal(outputValue);
   *
   * // Writing an object value
   * const outputValue = {
   *   html: <div>Hello, world!</div>,
   * };
   * await writeToTerminal(outputValue);
   *
   * @returns A promise that resolves once the value is added to the terminal history.
   */
  const writeToTerminal = async (value: TerminalOutputValue) => {
    if (typeof value === 'string') {
      await db.history.add({
        type: 'output',
        value: value,
      });
    } else if (typeof value === 'object') {
      const jsx = value.html;
      const htmlString = safeRenderToString(jsx);
      await db.history.add({
        type: 'output',
        value: {
          html: htmlString,
        },
      });
    }
  };

  return {
    lastCursor,
    defaultCommands,
    handler,
    setLastCursor,
    clearTerminal,
    writeToTerminal,
    executeCommand,
    getCommand,
  };
};

export default useCommands;
