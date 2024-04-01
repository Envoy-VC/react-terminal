import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminalContext } from '~/lib/hooks';

const ExecutingLoader = () => {
  const { isExecuting, executingLoader, fontSize } = useTerminalContext();
  if (isExecuting) {
    if (executingLoader) {
      return <>{executingLoader}</>;
    } else {
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
    }
  } else {
    return <></>;
  }
};

export default ExecutingLoader;
