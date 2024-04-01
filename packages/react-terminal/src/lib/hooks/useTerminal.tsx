import { useCommands, useTerminalContext } from '~/lib/hooks';

const useTerminal = () => {
  const { text } = useTerminalContext();
  const { getCommand, executeCommand } = useCommands();

  const handler = async () => {
    if (text === '') return;
    try {
      const command = getCommand(text);
      await executeCommand(text, command);
    } catch (error) {
      console.error(error);
    }
  };

  return { handler };
};

export default useTerminal;
