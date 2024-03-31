import React from 'react';

import { useCommands, useTerminalContext } from '~/lib/hooks';

import { useLocalStorage } from 'usehooks-ts';

import { db } from '../db';

const useTerminal = () => {
  const context = useTerminalContext();
  const { defaultCommands } = useCommands();
  const [reFocus, setReFocus] = React.useState(false);

  const [lastCursor, setLastCursor] = useLocalStorage('lastCursor', 0);

  const handler = async () => {
    const { text, commands, defaultHandler, setText, setIsExecuting } = context;
    if (text === '') return;
    try {
      const commandValue = text.trim();
      const command = [...commands, ...defaultCommands]
        .filter((c) => {
          const regex = new RegExp(`^${c.name}( |$)`);
          return regex.test(commandValue);
        })
        .at(0);

      if (!command) {
        if (defaultHandler) {
          setIsExecuting(true);
          const res = await defaultHandler(commandValue);
          await db.history.add({
            type: 'command',
            value: commandValue,
          });
          if (typeof res === 'string') {
            await db.history.add({
              type: 'output',
              value: res,
            });
          } else if (typeof res === 'object') {
            // TODO: Handle HTML Results
          } else {
            // do nothing
          }
          setIsExecuting(false);
        } else {
          await db.history.add({
            type: 'command',
            value: commandValue,
          });
          await db.history.add({
            type: 'output',
            value: `Command not found: ${commandValue}`,
          });
        }
        setText('');
        setReFocus((prev) => !prev);
        return;
      }

      const waitForExecution = command.waitForExecution ?? true;
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
        setReFocus((prev) => !prev);
      }

      const result = await command.handler(args, commandValue);

      if (waitForExecution) {
        await db.history.add({
          type: 'command',
          value: commandValue,
        });
      }

      if (typeof result === 'string') {
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
        setIsExecuting(false);
        setText('');
        setReFocus((prev) => !prev);
        setText('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handler, ...context, reFocus, lastCursor, setLastCursor };
};

export default useTerminal;
