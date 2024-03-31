import React from 'react';

import { useTerminal } from '~/lib/hooks';
import { themes } from '~/lib/themes';
import { cn } from '~/lib/utils';

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
  const { isExecuting } = useTerminal();

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

  return (
    <div
      ref={terminalRef}
      className={cn(
        'font-mono relative flex rounded-[10px] w-full bg-background text-foreground flex-col overflow-scroll hide-scrollbar ',
        className
      )}
      {...props}
    >
      {showTitleBar && <TitleBar {...titleBar} />}
      <Output />
      <InputBox ref={inputRef} {...inputBox} />
      <ExecutingLoader />
    </div>
  );
};

export default TerminalContainer;
