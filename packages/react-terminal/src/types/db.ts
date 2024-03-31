export type TerminalCommand = {
  id?: number;
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
  id?: number;
  type: 'output';
  value: TerminalOutputValue;
};

export type TerminalHistory = TerminalCommand | TerminalOutput;
