import { useCommands, useTerminalContext } from '~/lib/hooks';

/**
 * Custom hook for managing terminal functionality.
 *
 * @group Hooks
 *
 * @remarks
 * This hook provides access to the terminal context and commands, allowing you to handle user input and execute commands.
 *
 * @example
 * ```tsx
 * import { Theme } from "@envoy1084/react-terminal";
 * const { handler, setTheme, theme } = useTerminal();
 *
 * // Handle user input
 * const handleInput = () => {
 *   // ...
 *   handler();
 *   // ...
 * };
 *
 * // Set terminal theme
 * const changeTheme = (newTheme: Theme) => {
 *   // ...
 *   setTheme(newTheme);
 *   // ...
 * };
 * ```
 *
 * @returns An object containing the `handler` function, `setTheme` function, and `theme` value.
 *
 * @see {@link useCommands} for accessing the available commands and executing them.
 */
const useTerminal = () => {
  const { text, theme, fontSize, prompt, setTheme, setFontSize, setPrompt } =
    useTerminalContext();
  const { getCommand, executeCommand } = useCommands();

  const handler = async () => {
    if (text === '') return;
    const command = getCommand(text);
    await executeCommand(text, command);
  };

  return { theme, fontSize, prompt, handler, setTheme, setFontSize, setPrompt };
};

export default useTerminal;
