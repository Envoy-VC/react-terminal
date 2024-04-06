import { useTerminalContext } from '~/lib/hooks';

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
