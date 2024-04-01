import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminalContext } from '~/lib/hooks';

const ExecutingLoader = () => {
  const { isExecuting } = useTerminalContext();
  return (
    <>
      {isExecuting && (
        <div className='flex flex-row items-center gap-[6px] px-2'>
          <ThreeDotsMoving color='var(--terminal-foreground)' />
          <span className='text-sm font-medium text-foreground leading-5'>
            Executing Command...
          </span>
        </div>
      )}
    </>
  );
};

export default ExecutingLoader;
