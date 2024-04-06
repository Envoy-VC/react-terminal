import { TerminalHistory } from './db';

/**
 * Represents a function that renders a message in the terminal.
 *
 * @param message - The message to be rendered.
 * @returns The JSX element representing the rendered message.
 */
export type MessageRenderer = ({
  message,
}: {
  message: TerminalHistory;
}) => JSX.Element;

/**
 * Represents the properties for the Output component.
 */
export interface OutputProps {
  /**
   * The custom renderer for rendering the output messages.
   */
  renderer?: MessageRenderer;

  /**
   * Determines whether to disable ANSI escape sequences in the output.
   */
  disableAnsi?: boolean;
}
