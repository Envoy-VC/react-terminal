export type TerminalCommand = {
  type: 'command';
  value: string;
};

export type TerminalOutputValue =
  | undefined
  | string
  | {
      html: string;
    };

export type TerminalOutput = {
  type: 'output';
  value: TerminalOutputValue;
};

export type TerminalHistory = TerminalCommand | TerminalOutput;
