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
 * const { setTheme, theme } = useTerminal();
 *
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
  const {
    inputRef,
    terminalRef,
    theme,
    text,
    fontSize,
    setFontSize,
    setTheme,
    setText,
  } = useTerminalContext();
  const { clearTerminal, writeToTerminal } = useCommands();

  /**
   * Focuses the terminal input box.
   */
  const focus = () => {
    inputRef.current?.focus();
  };

  /**
   * Blurs the terminal input box.
   */
  const blur = () => {
    inputRef.current?.blur();
  };

  /**
   * Scrolls the terminal to the top.
   */
  const scrollToTop = () => {
    terminalRef.current?.scrollTo(0, 0);
  };

  /**
   * Scrolls the terminal to the bottom.
   */
  const scrollToBottom = () => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  };

  /**
   * Scrolls the terminal into view.
   */
  const scrollInView = () => {
    terminalRef.current?.scrollIntoView();
  };

  return {
    inputRef,
    terminalRef,
    theme,
    fontSize,
    inputBoxValue: text,
    focus,
    blur,
    scrollToTop,
    scrollToBottom,
    scrollInView,
    writeToTerminal,
    clearTerminal,
    setFontSize,
    setTheme,
    setInputBoxValue: setText,
  };
};

export default useTerminal;
