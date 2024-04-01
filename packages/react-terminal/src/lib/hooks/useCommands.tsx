import { db } from '~/lib/db';
import { safeRenderToString } from '~/lib/helpers/rehype';
import { useTerminalContext } from '~/lib/hooks';

import { useLocalStorage } from 'usehooks-ts';
import { Command } from '~/types';

/**
 * Custom hook that provides functionality for handling commands in a terminal.
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
    commands,
    defaultHandler,
    refocus,
    setIsExecuting,
    setText,
    setRefocus,
    addCommand,
    setCommands,
  } = useTerminalContext();

  const [lastCursor, setLastCursor] = useLocalStorage('lastCursor', 0);

  /**
   * Clears the terminal by updating the last cursor position and returning undefined.
   *
   * @remarks
   * This function is used to clear the terminal by updating the last cursor position in the database.
   *
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
   *
   * @param text - The input text representing the command.
   * @returns The command handler function.
   *
   * @remarks
   * This function searches for a command that matches the provided text and returns its corresponding handler function.
   * If no matching command is found, it falls back to the default handler or the fallback handler.
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
    const command = [...commands, ...defaultCommands]
      .filter((c) => {
        const regex = new RegExp(`^${c.name}( |$)`);
        return regex.test(commandValue);
      })
      .at(0);

    return command ?? defaultHandler ?? fallbackHandler;
  };

  const fallbackHandler: Command = {
    name: 'fallback',
    handler: (_args, text) => {
      return `Command not found: ${text}`;
    },
  };

  /**
   * Executes a command with the given text and command object.
   *
   * @param text - The input text for the command.
   * @param command - The command object containing the handler and other properties.
   * @returns A Promise that resolves when the command execution is complete.
   *
   * @remarks
   * This function executes a command by calling its handler function with the provided arguments.
   * It also updates the execution history and handles the output of the command.
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
    const waitForExecution = command.waitForExecution ?? true;
    const args = commandValue.replace(command.name, '').split(' ').splice(1);

    try {
      if (waitForExecution) {
        setIsExecuting(true);
      }

      if (!waitForExecution) {
        await db.history.add({
          type: 'command',
          value: commandValue,
        });
        setText('');
        setRefocus(!refocus);
      }

      const result = await command.handler(args, commandValue);

      if (waitForExecution) {
        await db.history.add({
          type: 'command',
          value: commandValue,
        });
      }

      // handle output
      if (typeof result === 'string') {
        await db.history.add({
          type: 'output',
          value: result,
        });
      } else if (typeof result === 'object') {
        const jsx = result.html;
        const htmlString = safeRenderToString(jsx);
        await db.history.add({
          type: 'output',
          value: {
            html: htmlString,
          },
        });
      }

      if (waitForExecution) {
        setIsExecuting(false);
        setText('');
        setRefocus(!refocus);
        setText('');
      }
    } catch (error) {
      if (command.onError) {
        await command.onError(args, commandValue);
      } else {
        await db.history.add({
          type: 'output',
          value: `Error: ${(error as Error).message}`,
        });
      }
      setIsExecuting(false);
      setText('');
      setRefocus(!refocus);
    }
  };

  return {
    lastCursor,
    defaultCommands,
    setLastCursor,
    clearTerminal,
    executeCommand,
    getCommand,
    addCommand,
    setCommands,
  };
};

export default useCommands;
