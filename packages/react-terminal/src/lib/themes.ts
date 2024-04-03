import { Theme } from '~/types/terminal';

const poimandres: Theme = {
  background: '#1b1e28',
  border: '#ffffff10',
  foreground: '#a6accd',
  selectionBackground: '#717cb425',
  selectionForeground: '#a6accd',
  ansiBlack: '#1b1e28',
  ansiBlue: '#89ddff',
  ansiBrightBlack: '#a6accd',
  ansiBrightBlue: '#ADD7FF',
  ansiBrightCyan: '#ADD7FF',
  ansiBrightGreen: '#5DE4c7',
  ansiBrightMagenta: '#f087bd',
  ansiBrightRed: '#d0679d',
  ansiBrightWhite: '#ffffff',
  ansiBrightYellow: '#fffac2',
  ansiCyan: '#89ddff',
  ansiGreen: '#5DE4c7',
  ansiMagenta: '#f087bd',
  ansiRed: '#d0679d',
  ansiWhite: '#ffffff',
  ansiYellow: '#fffac2',
};

const aurora_x: Theme = {
  background: '#07090F',
  selectionBackground: '#01030b',
  selectionForeground: '#86A5FF',
  border: '#15182B',
  foreground: '#A8BEFF',
  ansiBrightRed: '#dd5073',
  ansiGreen: '#63eb90',
  ansiRed: '#dd5073',
};

const github_light: Theme = {
  background: '#fff',
  border: '#e1e4e8',
  foreground: '#586069',
  selectionBackground: '#0366d625',
  selectionForeground: '#444d56',
  ansiBlack: '#24292e',
  ansiBlue: '#0366d6',
  ansiBrightBlack: '#959da5',
  ansiBrightBlue: '#005cc5',
  ansiBrightCyan: '#3192aa',
  ansiBrightGreen: '#22863a',
  ansiBrightMagenta: '#5a32a3',
  ansiBrightRed: '#cb2431',
  ansiBrightWhite: '#d1d5da',
  ansiBrightYellow: '#b08800',
  ansiCyan: '#1b7c83',
  ansiGreen: '#28a745',
  ansiMagenta: '#5a32a3',
  ansiRed: '#d73a49',
  ansiWhite: '#6a737d',
  ansiYellow: '#dbab09',
};

/**
 * Represents a collection of themes for the React Terminal component.
 *
 * @group Modules
 */
export const themes = {
  poimandres,
  aurora_x,
  github_light,
};
