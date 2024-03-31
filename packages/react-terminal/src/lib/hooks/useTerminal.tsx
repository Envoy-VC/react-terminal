import React from 'react';

import { db } from '../db';
import { useTerminalContext } from './useTerminalContext';

const useTerminal = () => {
  const {
    text,
    commands,
    waitForExecution,
    defaultHandler,
    setText,
    setIsExecuting,
  } = useTerminalContext();

  const handler = async () => {
    if (text === '') return;
    try {
      const commandValue = text.trim();
      const command = commands.filter((c) => {
        return new RegExp(`^${c.name} `).test(commandValue);
      })[0];

      if (!command) {
        if (defaultHandler) {
          defaultHandler(commandValue);
          return;
        } else {
          await db.history.add({
            type: 'output',
            value: `Command not found: ${commandValue}`,
          });
          setText('');
          return;
        }
      }

      const args = commandValue.replace(command.name, '').split(' ').splice(1);

      if (waitForExecution) {
        setIsExecuting(true);
      }

      if (!waitForExecution) {
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

      if (typeof result === 'string') {
        // TODO: Add result to db
        await db.history.add({
          type: 'output',
          value: result,
        });
      } else if (typeof result === undefined) {
        // do nothing
      } else {
        // TODO: Handle HTML Results
      }

      if (waitForExecution) {
        setText('');
        setIsExecuting(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handler };
};

export default useTerminal;
