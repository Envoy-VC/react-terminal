import { Theme } from '~/types/terminal';

const poimandres: Theme = {
  '--terminal-background': '#1b1e28',
  '--terminal-border': '#ffffff10',
  '--terminal-foreground': '#a6accd',
};

const andromeda: Theme = {
  '--terminal-background': '#23262E',
  '--terminal-border': '#00e8c5cc',
  '--terminal-foreground': '#D5CED9',
};

const aurora_x: Theme = {
  '--terminal-background': '#07090F',
  '--terminal-border': '#15182B',
  '--terminal-foreground': '#A8BEFF',
};

const github_dark: Theme = {
  '--terminal-background': '#24292e',
  '--terminal-border': '#1b1f23',
  '--terminal-foreground': '#d1d5da',
};

const github_light: Theme = {
  '--terminal-background': '#fff',
  '--terminal-border': '#e1e4e8',
  '--terminal-foreground': '#586069',
};

const houston: Theme = {
  '--terminal-background': '#17191e',
  '--terminal-border': '#343841',
  '--terminal-foreground': '#cccccc',
};

const catppuccin_frappe: Theme = {
  '--terminal-background': '#303446',
  '--terminal-border': '#626880',
  '--terminal-foreground': '#c6d0f5',
};

const catppuccin_latte: Theme = {
  '--terminal-background': '#e6e9ef',
  '--terminal-border': '#acb0be',
  '--terminal-foreground': '#4c4f69',
};

const catppuccin_macchiato: Theme = {
  '--terminal-background': '#24273a',
  '--terminal-border': '#5b6078',
  '--terminal-foreground': '#cad3f5',
};

const catppuccin_mocha: Theme = {
  '--terminal-background': '#1e1e2e',
  '--terminal-border': '#585b70',
  '--terminal-foreground': '#cdd6f4',
};

const dracula: Theme = {
  '--terminal-background': '#282A36',
  '--terminal-border': '#BD93F9',
  '--terminal-foreground': '#F8F8F2',
};

const material: Theme = {
  '--terminal-background': '#263238',
  '--terminal-border': '#00000030',
  '--terminal-foreground': '#EEFFFF',
};

const monokai: Theme = {
  '--terminal-background': '#272822',
  '--terminal-border': '#34352f',
  '--terminal-foreground': '#f8f8f2',
};

const nord: Theme = {
  '--terminal-background': '#2e3440',
  '--terminal-border': '#3b425201',
  '--terminal-foreground': '#d8dee9',
};

const slack_dark: Theme = {
  '--terminal-background': '#222222',
  '--terminal-border': '#0077B5',
  '--terminal-foreground': '#E6E6E6',
};

const slack_ochin: Theme = {
  '--terminal-background': '#FFF',
  '--terminal-border': '#2D3E4C',
  '--terminal-foreground': '#161F26',
};

const solarized_light: Theme = {
  '--terminal-background': '#FDF6E3',
  '--terminal-border': '#DDD6C1',
  '--terminal-foreground': '#657B83',
};

const solarized_dark: Theme = {
  '--terminal-background': '#002B36',
  '--terminal-border': '#00212B',
  '--terminal-foreground': '#839496',
};

const tokyo_night: Theme = {
  '--terminal-background': '#16161e',
  '--terminal-border': '#101014',
  '--terminal-foreground': '#787c99',
};

/**
 * Represents a collection of themes for the React Terminal component.
 *
 * @group Modules
 */
export const themes = {
  poimandres,
  andromeda,
  aurora_x,
  github_dark,
  github_light,
  houston,
  catppuccin_frappe,
  catppuccin_latte,
  catppuccin_macchiato,
  catppuccin_mocha,
  dracula,
  material,
  monokai,
  nord,
  slack_dark,
  slack_ochin,
  solarized_light,
  solarized_dark,
  tokyo_night,
};
