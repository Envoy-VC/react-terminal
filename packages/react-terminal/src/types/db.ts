export type TerminalCommand = {
  id?: number;
  type: 'command';
  value: string;
};

export type TerminalOutputValue =
  | undefined
  | string
  | {
      html: JSX.Element;
    };

export type DBOutput =
  | undefined
  | string
  | {
      html: string;
    };

export type TerminalOutput = {
  id?: number;
  type: 'output';
  value: DBOutput;
};

export type TerminalHistory = TerminalCommand | TerminalOutput;
