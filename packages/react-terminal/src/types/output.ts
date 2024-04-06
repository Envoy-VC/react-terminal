import { TerminalHistory } from './db';

export type MessageRenderer = ({
  message,
}: {
  message: TerminalHistory;
}) => JSX.Element;

export interface OutputProps {
  renderer?: MessageRenderer;
  disableAnsi?: boolean;
}
