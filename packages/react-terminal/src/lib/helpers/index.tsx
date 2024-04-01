import { Command, InputBoxProps } from '~/types';

import { db } from '../db';

export const defaultPrompt = (
  <span className='text-sky-500 font-medium'>$</span>
);

export const calculateTextAreaHeight = (text: string, fontSize: number) => {
  const rows = text.split('\n').length;
  const minHeight = fontSize * 1.5;
  const rowHeight = fontSize * 1.5;
  return `${Math.max(minHeight, rows * rowHeight)}px`;
};

export const getCursor = (type: InputBoxProps['cursor']) => {
  switch (type) {
    case 'block':
      return <span className='!text-foreground animate-blink'>▊</span>;
    case 'bar':
      return <span className='!text-foreground animate-blink'>|</span>;
    case 'underscore':
      return <span className='!text-foreground animate-blink'>_</span>;
    default:
      return type;
  }
};
