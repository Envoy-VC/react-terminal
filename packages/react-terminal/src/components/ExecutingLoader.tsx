import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminalContext } from '~/lib/hooks';

export const Loader = () => (
  <div className='flex flex-row items-center gap-[6px] px-2'>
    <ThreeDotsMoving color='var(--terminal-foreground)' />
    <span className='text-sm font-medium text-foreground leading-5'>
      Executing Command...
    </span>
  </div>
);
const ExecutingLoader = () => {
  const { isExecuting, executingLoader } = useTerminalContext();
  if (isExecuting) {
    if (executingLoader) {
      return <>{executingLoader}</>;
    } else {
      return <Loader />;
    }
  } else {
    return <></>;
  }
};

export default ExecutingLoader;
