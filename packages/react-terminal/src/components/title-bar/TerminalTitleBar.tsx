import React, { useImperativeHandle } from 'react';

import { cn } from '~/lib/utils';

type Props = React.ComponentProps<'div'>;

const TerminalTitleBar = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const titlebarRef = React.useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => titlebarRef.current!, []);

    const { className, children, ...rest } = props;

    return (
      <div
        className={cn(
          'sticky top-0 border-b w-full border-border h-fit px-4 py-1 bg-background flex flex-row items-center',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default TerminalTitleBar;
