import React from 'react';

import {
  Command,
  Loaders,
  Terminal,
  Theme,
  db,
  themes,
  useTerminal,
} from '@envoy1084/react-terminal';

const Demo = () => {
  const { theme, setTheme } = useTerminal();
  const commands: Command[] = [
    {
      name: 'time',
      handler: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return `Time is ${new Date(new Date().getTime())}`;
      },
    },
    {
      name: 'time1',
      handler: () => {
        return `Time is ${new Date(new Date().getTime())}`;
      },
      waitForExecution: false,
    },
    {
      name: 'error',
      handler: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        throw new Error('This is an error');
        return `Time is ${new Date(new Date().getTime())}`;
      },
      waitForExecution: false,
    },
    {
      name: 'error1',
      handler: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        throw new Error('This is an error');
      },
      onError: async () => {
        return 'Custom error message';
      },
      waitForExecution: true,
    },
    {
      name: 'html',
      handler: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
          html: (
            <div className='text-base font-medium text-orange-400'>
              This is a custom HTML element
              <a
                href='https://google.com'
                className='text-blue-400 underline ml-2'
              >
                Google
              </a>
            </div>
          ),
        };
      },
      waitForExecution: true,
    },
  ];

  return (
    <div className='flex py-12 justify-center items-center mx-auto flex-col gap-8'>
      <select
        name='theme'
        id='theme'
        onChange={(e) => {
          setTheme(themes[e.target.value as keyof typeof themes]);
        }}
      >
        {Object.keys(themes).map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName}
          </option>
        ))}
      </select>
      <Terminal
        inputBox={{
          cursor: 'block',
        }}
        executingLoader={
          <div className='flex flex-row gap-2'>
            <Loaders.BlocksWave
              className='text-foreground'
              color='var(--terminal-foreground)'
            />
            Loading...
          </div>
        }
        theme={theme}
        commands={commands}
        className='!aspect-video max-w-screen-lg w-full'
      />
    </div>
  );
};

export default Demo;
