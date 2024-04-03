import { useTerminalContext } from '~/lib/hooks';

const ExecutingLoader = () => {
  const { isExecuting, executingLoader } = useTerminalContext();
  if (isExecuting) {
    return <>{executingLoader}</>;
  } else {
    return <></>;
  }
};

export default ExecutingLoader;
