import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { db } from '~/lib/db';
import { constructTerminalProps } from '~/lib/helpers/terminal';
import { useCommands, useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { useLiveQuery } from 'dexie-react-hooks';
import { useEventListener } from 'usehooks-ts';
import { TerminalProps, WithoutRef } from '~/types';

type Props = TerminalProps & WithoutRef<'div'>;

/**
 * Represents a terminal component.
 *
 * @group Component
 * @example
 * ```tsx
 * <Terminal
 *   fontSize={14}
 *   autoScroll={true}
 *   commands={[]}
 *   disableDefaultCommands={false}
 *   defaultHandler={handleCommand}
 * >
 * //Terminal Content goes here
 * </Terminal>
 **/

const Terminal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    theme,
    fontSize,
    autoScroll,
    commands,
    disableDefaultCommands,
    defaultHandler,
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

  const terminalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => terminalRef.current!, []);

  useEffect(() => {
    const terminalProps = constructTerminalProps({
      theme,
      fontSize,
      autoScroll,
      commands,
      disableDefaultCommands,
      defaultHandler,
    });

    setTerminalProps(terminalProps);
  }, [theme]);

  useEffect(() => {
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

  useEffect(() => {
    const scrollToBottom = () => {
      const container = terminalRef.current;
      if (!container) return;

      const scrollDifference = container.scrollHeight - container.clientHeight;
      // Check if the user is near the bottom about 40% of the screen
      const isNearBottom = container.scrollTop > scrollDifference * 0.6;

      if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
      }
    };
    const interval = setInterval(() => scrollToBottom(), 3000);
    scrollToBottom();
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
