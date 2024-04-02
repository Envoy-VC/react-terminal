import React from 'react';

import { Command, Terminal, useTerminal } from '@envoy1084/react-terminal';

import Settings from './Settings';

const ReactTerminal = () => {
  const { theme, prompt } = useTerminal();
  const commands: Command[] = [
    {
      name: 'time',
      description: 'Get current time',
      usage: 'time',
      handler: () => `Time is ${new Date(new Date().getTime())}`,
      waitForExecution: false,
    },
  ];

  return (
    <div className='!mx-auto flex !max-w-screen-lg flex-col items-center justify-center gap-8 py-12 w-full'>
      <Settings />
      <Terminal
        inputBox={{
          prompt: prompt,
        }}
        theme={theme}
        commands={commands}
        className='!aspect-video max-w-screen-lg w-full border-none'
      />
    </div>
  );
};

export default ReactTerminal;
