import { Command } from './commands';

/**
 * Theme configuration for the Terminal
 */
export type Theme = {
  background: string;
  foreground: string;
  border: string;
  selectionBackground: string;
  selectionForeground: string;
  ansiBlue?: string;
  ansiBlack?: string;
  ansiBrightBlue?: string;
  ansiBrightBlack?: string;
  ansiBrightCyan?: string;
  ansiBrightGreen?: string;
  ansiBrightMagenta?: string;
  ansiBrightRed?: string;
  ansiBrightWhite?: string;
  ansiBrightYellow?: string;
  ansiCyan?: string;
  ansiGreen?: string;
  ansiMagenta?: string;
  ansiRed?: string;
  ansiWhite?: string;
  ansiYellow?: string;
  ansiBlackBg?: string;
  ansiRedBg?: string;
  ansiGreenBg?: string;
  ansiYellowBg?: string;
  ansiBlueBg?: string;
  ansiMagentaBg?: string;
  ansiCyanBg?: string;
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
}
