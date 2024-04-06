import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '~/lib/utils';

import { OutputProps, TerminalHistory, WithoutRef } from '~/types';

import DefaultRenderer from './DefaultRenderer';

type Props = OutputProps & WithoutRef<'div'>;

const Output = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    renderer: CustomRenderer,
    disableAnsi = false,
    children,
    className,
    ...rest
  } = props;
  const outputRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => outputRef.current!, []);

  const messages: TerminalHistory[] = [];

  return (
    <div
      ref={outputRef}
      className={cn('flex flex-col px-2 gap-0', className)}
      {...rest}
    >
      {messages.map((message) => {
        const { id } = message;
        if (CustomRenderer) {
          return <CustomRenderer key={id} message={message} />;
        } else {
          return (
            <DefaultRenderer
              key={id}
              message={message}
              disableAnsi={disableAnsi}
            />
          );
        }
      })}
    </div>
  );
});

export default Output;
