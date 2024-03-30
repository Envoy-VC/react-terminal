import React from 'react';

import { poimandres } from '~/lib/themes';
import { cn } from '~/lib/utils';

import TitleBar from '~/components/TitleBar';

import { TerminalProps } from '~/types';

const Terminal: React.FC<TerminalProps> = ({
  welcomeMessage,
  commands,
  prompt,
  showTitleBar = true,
  className,
  theme = poimandres,
  ...props
}) => {
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--terminal-background',
      theme['terminal.background']
    );
    root.style.setProperty('--terminal-border', theme['terminal.border']);
    root.style.setProperty(
      '--terminal-foreground',
      theme['terminal.foreground']
    );
  }, [theme]);

  return (
    <div
      {...props}
      className={cn(
        'flex rounded-lg w-full bg-background text-foreground',
        className
      )}
    >
      {showTitleBar && <TitleBar />}
    </div>
  );
};

export default Terminal;
