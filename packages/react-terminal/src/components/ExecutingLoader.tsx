import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminal } from '~/lib/hooks';

const ExecutingLoader = () => {
  const { isExecuting } = useTerminal();
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
