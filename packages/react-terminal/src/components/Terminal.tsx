import React, { useImperativeHandle } from 'react';

import { db } from '~/lib/db';
import { constructTerminalProps } from '~/lib/helpers/terminal';
import { useCommands, useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { useLiveQuery } from 'dexie-react-hooks';
import { useEventListener } from 'usehooks-ts';

import { TerminalProps } from '~/types/terminal';

type Props = TerminalProps & React.ComponentProps<'div'>;

const Terminal = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    theme,
    fontSize,
    autoScroll,
    commands,
    disableDefaultCommands,
    className,
    children,
    ...rest
  } = props;
  const {
    isExecuting,
    theme: storeTheme,
    setTerminalProps,
  } = useTerminalContext();
  const { lastCursor } = useCommands();

  const terminalRef = React.useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => terminalRef.current!, []);

  React.useEffect(() => {
    const terminalProps = constructTerminalProps({
      theme,
      fontSize,
      autoScroll,
      commands,
      disableDefaultCommands,
    });

    setTerminalProps(terminalProps);
  }, [theme]);

  React.useEffect(() => {
    Object.entries(storeTheme).forEach(([key, value]) => {
      const k = '--terminal-' + key;
      terminalRef?.current?.style.setProperty(k, value);
    });
  }, [storeTheme]);

  const messages = useLiveQuery(async () => {
    const res = await db.history.filter((x) => x.id! > lastCursor).toArray();
    return res;
  }, [lastCursor]);

  useEventListener(
    'click',
    () => {
      if (!isExecuting) {
        const textarea = document.getElementById(
          'terminal-input-textarea'
        ) as HTMLTextAreaElement;
        textarea?.focus();
      }
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      const container = terminalRef.current;
      if (!container) return;

      const scrollDifference = container.scrollHeight - container.clientHeight;
      // Check if the user is near the bottom about 40% of the screen
      const isNearBottom = container.scrollTop > scrollDifference * 0.6;

      if (isNearBottom && autoScroll) {
        container.scrollTop = container.scrollHeight;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div
      ref={terminalRef}
      className={cn(
        'font-mono relative flex rounded-[10px] w-full bg-background text-foreground flex-col overflow-scroll hide-scrollbar border selection:bg-selectionBackground selection:text-selectionForeground',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Terminal;
