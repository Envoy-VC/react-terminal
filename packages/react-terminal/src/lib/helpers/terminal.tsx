import { AllRequired } from '~/types';
import { TerminalOutputValue } from '~/types';

import { db } from '../db';
import { themes } from '../themes';
import { safeRenderToString } from './rehype';

import { TerminalProps } from '~/types/terminal';

export const constructTerminalProps = (
  props: TerminalProps
): AllRequired<TerminalProps> => {
  const terminalProps: AllRequired<TerminalProps> = {
    theme: props.theme ?? themes.poimandres,
    fontSize: props.fontSize ?? 16,
    autoScroll: props.autoScroll ?? true,
    commands: props.commands ?? [],
    disableDefaultCommands: props.disableDefaultCommands ?? false,
    defaultHandler: props.defaultHandler ?? {
      name: 'default',
      handler: (_, command) => {
        return `${command}: command not found`;
      },
    },
  };

  return terminalProps;
};

/**
 * Clears the terminal by updating the last cursor position and returning undefined.
 *
 * @group Helpers
 * @example
 * ```tsx
 * const clear = async () => {
 *   await clearTerminal();
 * };
 * ```
 *
 * @see {@link db.history.count}
 */
export const clearTerminal = async () => {
  const lastele = await db.history.orderBy('id').last();
  const last = lastele?.id ?? 0;
  window.localStorage.setItem('lastCursor', `${last}`);
  return undefined;
};

/**
 * Resets the terminal by clearing the history from IndexedDB
 *
 * @group Helpers
 * @example
 *
 * ```tsx
 * const reset = async () => {
 *   await resetTerminal();
 * }
 * ```
 */
export const resetTerminal = async () => {
  clearTerminal();
  await db.history.clear();
};

/**
 * This function adds the provided value to the terminal history. If the value is a string, it is added directly. If the value is an object, the `html` property of the object is converted to a string using `safeRenderToString` function before adding it to the history.
 *
 * @group Helpers
 * @param value - The value to be written to the terminal.
 *
 * @example
 * // Writing a string value
 * const outputValue = 'Hello, world!';
 * await writeToTerminal(outputValue);
 *
 * // Writing an object value
 * const outputValue = {
 *   html: <div>Hello, world!</div>,
 * };
 * await writeToTerminal(outputValue);
 *
 * @returns A promise that resolves once the value is added to the terminal history.
 */
export const writeToTerminal = async (value: TerminalOutputValue) => {
  if (typeof value === 'string') {
    await db.history.add({
      type: 'output',
      value: value,
    });
  } else if (typeof value === 'object') {
    const jsx = value.html;
    const htmlString = safeRenderToString(jsx);
    await db.history.add({
      type: 'output',
      value: {
        html: htmlString,
      },
    });
  }
};