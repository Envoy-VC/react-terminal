import React from 'react';

import { useTerminalContext } from '~/lib/hooks';

import { TerminalHistory } from '~/types';

import AnsiRenderer from './AnsiRenderer';
import JSXRenderer from './JSXRenderer';

interface Props {
  disableAnsi: boolean;
  message: TerminalHistory;
}

const DefaultRenderer = ({ message, disableAnsi }: Props) => {
  const { fontSize, prompt } = useTerminalContext();
  const { type, value, id } = message;
  if (type === 'command') {
    return (
      <div
        key={id}
        className='flex flex-row gap-1'
        style={{
          fontSize: fontSize,
        }}
      >
        {prompt}
        <div>{value}</div>
      </div>
    );
  } else {
    if (typeof value === 'object') {
      const htmlString = value.html;
      return <JSXRenderer key={message.id} htmlString={htmlString} />;
    } else {
      if (disableAnsi) {
        return (
          <div
            key={message.id}
            className='whitespace-pre'
            style={{
              fontSize: fontSize,
            }}
          >
            {value}
          </div>
        );
      } else {
        return <AnsiRenderer text={value ?? ''} />;
      }
    }
  }
};

export default DefaultRenderer;
