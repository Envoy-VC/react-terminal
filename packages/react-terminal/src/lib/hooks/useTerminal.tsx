import { useCommands, useTerminalContext } from '~/lib/hooks';

const useTerminal = () => {
  const { text } = useTerminalContext();
  const { getCommand, executeCommand } = useCommands();

  const handler = async () => {
    if (text === '') return;
    const command = getCommand(text);
    await executeCommand(text, command);
  };

  return { handler };
};

export default useTerminal;
