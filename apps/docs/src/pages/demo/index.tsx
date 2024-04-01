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
      name: 'html',
      handler: async () => {
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
      waitForExecution: false,
    },
  ];

  return (
    <div className='flex py-12 justify-center items-center mx-auto'>
      <Terminal
        inputBox={{
          cursor: 'underscore',
        }}
        //executingLoader={<>loading...</>}
        commands={commands}
        className='!aspect-video max-w-screen-lg w-full'
      />
    </div>
  );
};

export default Demo;
