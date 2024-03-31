import { Theme } from '~/types/terminal';
import { ThemeNames } from '~/types/terminal';

const poimandres: Theme = {
  '--terminal-background': '#1b1e28',
  '--terminal-border': '#ffffff10',
  '--terminal-foreground': '#a6accd',
};

export const themes: Record<ThemeNames, Theme> = {
  poimandres,
};
