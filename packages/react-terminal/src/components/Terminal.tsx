import React from 'react';

import { poimandres } from '~/lib/themes';
import { cn } from '~/lib/utils';

import { useEventListener } from 'usehooks-ts';
import { InputBox, TitleBar } from '~/components';
import { TerminalProps } from '~/types';

const Terminal = ({
  theme = poimandres,
  showTitleBar = true,
  titleBar,
  inputBox,
  className,
  ...props
}: TerminalProps) => {
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  useEventListener('click', () => inputRef.current?.focus(), terminalRef);

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
      <InputBox ref={inputRef} {...inputBox} />
    </div>
  );
};

export default Terminal;
