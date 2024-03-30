import React from 'react';

import { poimandres } from '~/lib/themes';
import { cn } from '~/lib/utils';

import TitleBar from '~/components/TitleBar';

import { TerminalProps } from '~/types';

const Terminal: React.FC<TerminalProps> = ({
  theme = poimandres,
  showTitleBar = true,
  titleBar,
  className,
  ...props
}) => {
  React.useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <div
      {...props}
      className={cn(
        'flex rounded-[10px] w-full bg-background text-foreground',
        className
      )}
    >
      {showTitleBar && <TitleBar {...titleBar} />}
    </div>
  );
};

export default Terminal;
