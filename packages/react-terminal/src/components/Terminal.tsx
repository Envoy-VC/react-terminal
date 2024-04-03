import React from 'react';

import { db } from '~/lib/db';
import { constructTerminalProps } from '~/lib/helpers';
import { useCommands, useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { useLiveQuery } from 'dexie-react-hooks';
import { useEventListener } from 'usehooks-ts';
import { ExecutingLoader, InputBox, Output, TitleBar } from '~/components';
import { TerminalPropsDetailed } from '~/types';

/**
 * Terminal component for displaying a command-line interface.
 *
 * @group Components
 *
 * @remarks
 * The `Terminal` component is used to create a command-line interface with customizable themes, font size, and various features such as executing commands, displaying output, and accepting user input.
 *
 * @example
 * ```tsx
 * <Terminal
 *   theme={customTheme}
 *   fontSize={18}
 *   commands={commands}
 * />
 * ```
 */
const Terminal = ({
  theme,
  showTitleBar = true,
  titleBar,
  titleBarProps,
  inputBox,
  inputBoxProps,
  fontSize,
  executingLoader,
  commands,
  defaultHandler,
  htmlRenderer,
  className,
  ...props
}: TerminalPropsDetailed) => {
  const { isExecuting, init, theme: storeTheme } = useTerminalContext();
  const { lastCursor } = useCommands();

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const terminalProps = constructTerminalProps({
      theme,
      showTitleBar,
      titleBar,
      titleBarProps,
      inputBox,
      inputBoxProps,
      fontSize,
      executingLoader,
      commands,
      defaultHandler,
    });

    init({
      text: '',
      isExecuting: false,
      commandIndex: -1,
      terminalRef,
      inputRef,
      ...terminalProps,
    });
  }, [theme]);

  React.useEffect(() => {
    Object.entries(storeTheme).forEach(([key, value]) => {
      terminalRef?.current?.style.setProperty(key, value);
    });
  }, [storeTheme]);

  const messages = useLiveQuery(async () => {
    const res = await db.history.filter((x) => x.id! > lastCursor).toArray();
    return res;
  }, [lastCursor]);

  useEventListener(
    'click',
    () => {
      if (!isExecuting) inputRef.current?.focus();
    },
    terminalRef
  );

  React.useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    const scrollDifference = container.scrollHeight - container.clientHeight;
    // Check if the user is near the bottom about 40% of the screen
    const isNearBottom = container.scrollTop > scrollDifference * 0.6;

    if (isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={terminalRef}
      className={cn(
        'font-mono relative flex rounded-[10px] w-full bg-background text-foreground flex-col overflow-scroll hide-scrollbar border',
        className
      )}
      {...props}
    >
      {showTitleBar && <TitleBar {...titleBarProps} />}
      <Output output={messages ?? []} />
      <InputBox ref={inputRef} {...inputBoxProps} />
      <ExecutingLoader />
    </div>
  );
};

export default Terminal;
