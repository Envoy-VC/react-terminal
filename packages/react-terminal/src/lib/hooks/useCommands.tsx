import { useLocalStorage } from 'usehooks-ts';
import { Command } from '~/types';

import { db } from '../db';
import { useTerminalContext } from './useTerminalContext';

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

  const executeCommand = async (text: string, command: Command) => {
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
        // TODO: Handle HTML Results
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
