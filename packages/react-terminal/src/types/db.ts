/**
 * Represents a command in the terminal database.
 */
export type TerminalDBCommand = {
  /**
   * The unique identifier of the command.
   */
  id?: number;
  /**
   * The type of the command.
   */
  type: 'command';
  /**
   * The value of the command.
   */
  value: string;
};

/**
 * Represents the output of a terminal command in the database.
 */
export type TerminalDBOutput = {
  /**
   * The unique identifier of the output.
   */
  id?: number;
  /**
   * The type of the output.
   */
  type: 'output';
  /**
   * The value of the output.
   * It can be undefined, a string, or an object with an HTML property.
   */
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
