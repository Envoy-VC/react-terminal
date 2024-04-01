/**
 * Represents a terminal command.
 *
 * @remarks
 * This type is used to define the structure of a terminal command object.
 *
 * @public
 */
export type TerminalCommand = {
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
   *
   * @example
   * ```
   * const command: TerminalCommand = {
   *   type: 'command',
   *   value: 'ls -l',
   * };
   * ```
   */
  value: string;
};

/**
 * Represents the possible values for a terminal output.
 *
 * @remarks
 * The `TerminalOutputValue` type can be one of the following:
 * - `undefined`: Represents an empty output.
 * - `string`: Represents a plain text output.
 * - `{ html: JSX.Element }`: Represents an output with HTML content.
 *
 * @example
 * ```typescript
 * const output1: TerminalOutputValue = undefined;
 * const output2: TerminalOutputValue = "Hello, world!";
 * const output3: TerminalOutputValue = { html: <div>Hello, <strong>world!</strong></div> };
 * ```
 */
export type TerminalOutputValue =
  | undefined
  | string
  | {
      html: JSX.Element;
    };

/**
 * Represents the possible output types of a database operation.
 *
 * @remarks
 * The `DBOutput` type can be one of the following:
 * - `undefined`: When there is no output.
 * - `string`: When the output is a string.
 * - `{ html: string }`: When the output is an object with an `html` property that contains a string.
 *
 * @example
 * ```typescript
 * const output1: DBOutput = undefined;
 * const output2: DBOutput = "Hello, world!";
 * const output3: DBOutput = { html: "<p>This is some HTML content</p>" };
 * ```
 */
export type DBOutput =
  | undefined
  | string
  | {
      html: string;
    };

/**
 * Represents a terminal output.
 *
 * @example
 * ```typescript
 * const output: TerminalOutput = {
 *    type: 'output',
 *    value: 'Hello, world!',
 * };
 * ```
 */
export type TerminalOutput = {
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
   */
  value: DBOutput;
};

/**
 * Represents the history of a terminal session, which can include both commands and outputs.
 */
export type TerminalHistory = TerminalCommand | TerminalOutput;
