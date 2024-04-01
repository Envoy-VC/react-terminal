import React from 'react';

import { db } from '~/lib/db';
import { useCommands, useTerminalContext } from '~/lib/hooks';
import { themes } from '~/lib/themes';
import { cn } from '~/lib/utils';

import { useLiveQuery } from 'dexie-react-hooks';
import { useEventListener } from 'usehooks-ts';
import { ExecutingLoader, InputBox, Output, TitleBar } from '~/components';
import { TerminalProps } from '~/types';

const TerminalContainer = ({
  theme = themes['poimandres'],
  showTitleBar = true,
  titleBar,
  inputBox,
  commands,
  className,
  ...props
}: TerminalProps) => {
  const { isExecuting } = useTerminalContext();
  const { lastCursor } = useCommands();

  const messages = useLiveQuery(async () => {
    const res = await db.history.filter((x) => x.id! > lastCursor).toArray();
    return res;
  }, [lastCursor]);

  const terminalRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const terminalContainer = terminalRef.current;
    Object.entries(theme).forEach(([key, value]) => {
      terminalContainer?.style.setProperty(key, value);
    });
  }, [theme]);

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
        'font-mono relative flex rounded-[10px] w-full bg-background text-foreground flex-col overflow-scroll hide-scrollbar',
        className
      )}
      {...props}
    >
      {showTitleBar && <TitleBar {...titleBar} />}
      <Output output={messages ?? []} />
      <InputBox ref={inputRef} {...inputBox} />
      <ExecutingLoader />
    </div>
  );
};

export default TerminalContainer;
