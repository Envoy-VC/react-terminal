import { useTerminalContext } from '~/lib/hooks';

/**
 * Custom hook for managing terminal state and settings.
 *
 * @group Hooks
 *
 * @returns An object containing the terminal theme, font size, input box value, and functions to update them.
 *
 * @example
 * ```tsx
 * const {
 *   fontSize,
 *   inputBoxValue,
 *   setFontSize,
 *   setInputBoxValue,
 * } = useTerminal();
 *
 * console.log(fontSize); // 14
 * console.log(inputBoxValue); // 'Hello, world!'
 *
 * setFontSize(16);
 * setInputBoxValue('New value');
 * ```
 */
const useTerminal = () => {
  const { theme, text, fontSize, setFontSize, setTheme, setText } =
    useTerminalContext();

  return {
    theme,
    fontSize,
    inputBoxValue: text,
    setFontSize,
    setTheme,
    setInputBoxValue: setText,
  };
};

export default useTerminal;
