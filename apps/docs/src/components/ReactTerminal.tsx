import React from 'react';

import {
  Command,
  Terminal,
  themes,
  useTerminal,
} from '@envoy1084/react-terminal';

import Settings from './Settings';

const ReactTerminal = () => {
  const { focus } = useTerminal();
  const commands: Command[] = [
    {
      name: 'time',
      description: 'Get current time',
      usage: 'time',
      handler: () => `Time is ${new Date(new Date().getTime())}`,
      waitForExecution: false,
    },
    {
      name: 'fetch',
      description: 'Fetch from the url',
      args: ['url'],
      handler: async (args) => {
        const url = args.shift() ?? '';
        const res = await fetch(url);
        const json = await res.json();
        return JSON.stringify(json, null, 2);
      },
      waitForExecution: true,
    },
  ];

  return (
    <div className='!mx-auto flex !max-w-screen-lg flex-col items-center justify-center gap-8 py-12 w-full'>
      <Settings />
      <Terminal
        commands={commands}
        className='!aspect-video max-w-screen-lg w-full border-none'
      />
      <button
        className='!text-white !bg-sky-500 !rounded-lg !px-4 !py-2 !font-semibold !text-lg'
        onClick={focus}
      >
        Focus
      </button>
    </div>
  );
};

export default ReactTerminal;
