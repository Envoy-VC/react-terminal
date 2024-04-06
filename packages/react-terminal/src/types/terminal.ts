import { Command } from './commands';

/**
 * Represents the theme configuration for the terminal.
 */
export type Theme = {
  /**
   * The background color of the terminal.
   */
  background: string;

  /**
   * The foreground color of the terminal.
   */
  foreground: string;

  /**
   * The border color of the terminal.
   */
  border: string;

  /**
   * The background color of the selected text in the terminal.
   */
  selectionBackground: string;

  /**
   * The foreground color of the selected text in the terminal.
   */
  selectionForeground: string;

  /**
   * The color for the blue ANSI escape code.
   */
  ansiBlue?: string;

  /**
   * The color for the black ANSI escape code.
   */
  ansiBlack?: string;

  /**
   * The color for the bright blue ANSI escape code.
   */
  ansiBrightBlue?: string;

  /**
   * The color for the bright black ANSI escape code.
   */
  ansiBrightBlack?: string;

  /**
   * The color for the bright cyan ANSI escape code.
   */
  ansiBrightCyan?: string;

  /**
   * The color for the bright green ANSI escape code.
   */
  ansiBrightGreen?: string;

  /**
   * The color for the bright magenta ANSI escape code.
   */
  ansiBrightMagenta?: string;

  /**
   * The color for the bright red ANSI escape code.
   */
  ansiBrightRed?: string;

  /**
   * The color for the bright white ANSI escape code.
   */
  ansiBrightWhite?: string;

  /**
   * The color for the bright yellow ANSI escape code.
   */
  ansiBrightYellow?: string;

  /**
   * The color for the cyan ANSI escape code.
   */
  ansiCyan?: string;

  /**
   * The color for the green ANSI escape code.
   */
  ansiGreen?: string;

  /**
   * The color for the magenta ANSI escape code.
   */
  ansiMagenta?: string;

  /**
   * The color for the red ANSI escape code.
   */
  ansiRed?: string;

  /**
   * The color for the white ANSI escape code.
   */
  ansiWhite?: string;

  /**
   * The color for the yellow ANSI escape code.
   */
  ansiYellow?: string;

  /**
   * The background color for the black ANSI escape code.
   */
  ansiBlackBg?: string;

  /**
   * The background color for the red ANSI escape code.
   */
  ansiRedBg?: string;

  /**
   * The background color for the green ANSI escape code.
   */
  ansiGreenBg?: string;

  /**
   * The background color for the yellow ANSI escape code.
   */
  ansiYellowBg?: string;

  /**
   * The background color for the blue ANSI escape code.
   */
  ansiBlueBg?: string;

  /**
   * The background color for the magenta ANSI escape code.
   */
  ansiMagentaBg?: string;

  /**
   * The background color for the cyan ANSI escape code.
   */
  ansiCyanBg?: string;

  /**
   * The background color for the white ANSI escape code.
   */
  ansiWhiteBg?: string;
};

/**
 * Represents the props for the Terminal component.
 *
 */
export interface TerminalProps {
  /**
   * The theme for the terminal.
   */
  theme?: Theme;
  /**
   * The font size for the terminal.
   */
  fontSize?: number;
  /**
   * Whether to auto scroll to bottom of the screen
   */
  autoScroll?: boolean;
  /**
   * An array of commands available in the terminal.
   */
  commands?: Command[];
  /**
   * Whether to disable the default commands or not.
   */
  disableDefaultCommands?: boolean;
  /**
   * The default handler for the terminal.
   */
  defaultHandler?: Command;
}
