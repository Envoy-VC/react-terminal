import React, { useImperativeHandle } from 'react';

import { cn } from '~/lib/utils';

type Props = React.ComponentPropsWithoutRef<'div'>;

const defaultMessage = `Welcome to React Terminal!

Try typing 'help' to see the list of available commands.`;

const WelcomeMessage = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props;
  const welcomeMessageRef = React.useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => welcomeMessageRef.current!, []);

  return (
    <div
      ref={welcomeMessageRef}
      {...props}
      className={cn('px-2 whitespace-pre-wrap', className)}
    >
      {children ?? defaultMessage}
    </div>
  );
});

export default WelcomeMessage;
