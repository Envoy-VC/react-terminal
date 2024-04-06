import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminalContext } from '~/lib/hooks';

import { WithoutRef } from '~/types';

type Props = WithoutRef<'div'>;

/**
 * Loader component that displays a loading indicator when the terminal is executing a command.
 *
 * @group Components
 * @example
 * ```tsx
 *  <TerminalLoader />
 * ```
 */
const Loader = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props;
  const loaderRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => loaderRef.current!, []);

  const { isExecuting } = useTerminalContext();

  return (
    <div ref={loaderRef} {...rest}>
      {isExecuting && (children ?? <DefaultLoader />)}
    </div>
  );
});

export default Loader;

export const DefaultLoader = () => {
  const { fontSize } = useTerminalContext();

  return (
    <div
      className='flex flex-row items-center gap-[6px] px-2'
      style={{
        fontSize: fontSize - 2,
      }}
    >
      <ThreeDotsMoving
        color='var(--terminal-foreground)'
        width={(fontSize - 2) * 2}
        height={(fontSize - 2) * 2}
      />
      <span className='font-medium text-foreground leading-5'>
        Executing Command...
      </span>
    </div>
  );
};
