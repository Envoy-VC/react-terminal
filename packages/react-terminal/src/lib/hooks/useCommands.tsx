// import { db } from '~/lib/db';
// import { writeToTerminal } from '~/lib/helpers';
// import { HelpCommand, fallbackHandler } from '~/lib/helpers/terminal';
// import { useTerminalContext } from '~/lib/hooks';

// import { useLocalStorage } from 'usehooks-ts';
// import { Command } from '~/types';

// const useCommands = () => {
//   const {
//     text,
//     commands,
//     defaultHandler,
//     disableDefaultCommands,
//     setIsExecuting,
//     setText,
//     setShowWelcomeMessage,
//   } = useTerminalContext();

//   const [lastCursor, setLastCursor] = useLocalStorage('lastCursor', 0);

//   /**
//    * Clears the terminal by updating the last cursor position and returning undefined.
//    *
//    * @example
//    * ```tsx
//    * const clear = async () => {
//    *   await clearTerminal();
//    * };
//    * ```
//    *
//    * @see {@link db.history.count}
//    */
//   const clearTerminal = async () => {
//     setShowWelcomeMessage(false);
//     const lastele = await db.history.orderBy('id').last();
//     console.log(lastele);
//     const last = lastele?.id ?? 0;
//     setLastCursor(last);
//     return undefined;
//   };

//   const defaultCommands: Command[] = [
//     {
//       name: 'clear',
//       description: 'Clears the terminal',
//       usage: 'clear',
//       handler: clearTerminal,
//       waitForExecution: false,
//     },
//     {
//       name: 'help',
//       description: 'Displays all the terminal commands',
//       usage: 'help',
//       handler: () => {
//         const terminalCommands = [
//           ...(disableDefaultCommands ? [] : defaultCommands),
//           ...commands,
//         ];
//         return {
//           html: <HelpCommand commands={terminalCommands} />,
//         };
//       },
//       waitForExecution: false,
//     },
//   ];

//   const getCommand = (text: string) => {
//     const commandValue = text.trim();
//     const terminalCommands = [
//       ...commands,
//       ...(disableDefaultCommands ? [] : defaultCommands),
//     ];
//     const command = terminalCommands
//       .filter((c) => {
//         const regex = new RegExp(`^${c.name}( |$)`);
//         return regex.test(commandValue);
//       })
//       .at(0);

//     return command ?? defaultHandler ?? fallbackHandler;
//   };

//   const handler = async () => {
//     if (text === '') return;
//     const command = getCommand(text);
//     await executeCommand(text, command);
//   };

//   const executeCommand = async (
//     text: string,
//     command: Command
//   ): Promise<void> => {
//     const commandValue = text.trim();
//     const waitForExecution = command.waitForExecution ?? false;
//     const args = commandValue.replace(command.name, '').split(' ').splice(1);
//     const callback = command?.callback ?? null;

//     try {
//       if (waitForExecution) {
//         setIsExecuting(true);
//       }

//       if (!waitForExecution) {
//         setIsExecuting(false);
//         await db.history.add({
//           type: 'command',
//           value: commandValue,
//         });
//         setText('');
//       }

//       const result = await command.handler(args, commandValue, command);

//       if (waitForExecution) {
//         await db.history.add({
//           type: 'command',
//           value: commandValue,
//         });
//       }

//       await writeToTerminal(result);

//       if (waitForExecution) {
//         setIsExecuting(false);
//         setText('');
//       }
//     } catch (error) {
//       if (command.onError) {
//         await command.onError(error, args, commandValue, command);
//       } else {
//         await db.history.add({
//           type: 'output',
//           value: `Error: ${(error as Error).message}`,
//         });
//       }
//       setIsExecuting(false);
//       setText('');
//     } finally {
//       if (callback) {
//         await callback();
//       }
//     }
//   };

//   return {
//     lastCursor,
//     defaultCommands,
//     handler,
//     setLastCursor,
//     writeToTerminal,
//     executeCommand,
//     getCommand,
//   };
// };

// export default useCommands;
