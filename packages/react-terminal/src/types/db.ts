export type TerminalDBCommand = {
  id?: number;
  type: 'command';
  value: string;
};

export type TerminalDBOutput = {
  id?: number;
  type: 'output';
  value:
    | undefined
    | string
    | {
        html: string;
      };
};

/**
 * Represents the history of a terminal session, which can include both commands and outputs.
 */
export type TerminalHistory = TerminalDBCommand | TerminalDBOutput;
