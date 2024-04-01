import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import {
  Command,
  Terminal,
  themes,
  useTerminal,
} from '@envoy1084/react-terminal';

type ThemeValue = keyof typeof themes;

const ReactTerminal = () => {
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
    <div className='!mx-auto flex !max-w-screen-lg flex-col items-center justify-center gap-8 py-12 w-full'>
      <div className='flex flex-row items-center gap-3 w-full'>
        <div>Theme: </div>
        <Select
          onValueChange={(v) => setTheme(themes[v as ThemeValue])}
          defaultValue='poimandres'
        >
          <SelectTrigger className='w-[20rem]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(themes).map((t) => (
              <SelectItem value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Terminal
        theme={theme}
        commands={commands}
        className='!aspect-video max-w-screen-lg w-full border-none'
      />
    </div>
  );
};

export default ReactTerminal;
