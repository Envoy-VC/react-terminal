import React from 'react';

import { Command, Terminal } from '@envoy1084/react-terminal';

const Demo = () => {
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
  ];

  return (
    <div className='flex py-12 justify-center items-center mx-auto'>
      <Terminal
        inputBox={{
          cursor: 'underscore',
        }}
        commands={commands}
        className='!aspect-video max-w-screen-lg w-full'
      />
    </div>
  );
};

export default Demo;
