import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { useCommands } from '~/lib/hooks';
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

  const { lastCursor } = useCommands();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [isCleared, setIsCleared] = useState<boolean>(false);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    } else {
      if (showOnClear) {
        setIsCleared(false);
      } else {
        setIsCleared(true);
      }
    }
  }, [lastCursor]);

  return (
    <div
      ref={welcomeMessageRef}
      className={cn('px-2 whitespace-pre-wrap', className)}
      {...rest}
    >
      {!isCleared && (children ?? defaultMessage)}
    </div>
  );
});

export default WelcomeMessage;
