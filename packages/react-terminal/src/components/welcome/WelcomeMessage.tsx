import { forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '~/lib/utils';

import { WelcomeMessageProps } from '~/types';

type Props = WelcomeMessageProps & React.ComponentPropsWithoutRef<'div'>;

const defaultMessage = `Welcome to React Terminal!

Try typing 'help' to see the list of available commands.`;

/**
 * The Welcome Message for the terminal.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <TerminalWelcomeMessage showOnClear>
 *   <div>
 *      <h1>Welcome to React Terminal</h1>
 *   </div>
 * </TerminalWelcomeMessage>
 * ```
 */
const WelcomeMessage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { showOnClear = false, children, className, ...rest } = props;
  const welcomeMessageRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => welcomeMessageRef.current!, []);

  return (
    <div
      ref={welcomeMessageRef}
      className={cn('px-2 whitespace-pre-wrap', className)}
      {...rest}
    >
      {children ?? defaultMessage}
    </div>
  );
});

export default WelcomeMessage;
