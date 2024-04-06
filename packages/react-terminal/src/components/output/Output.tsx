import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { db } from '~/lib/db';
import { useCommands } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { useLiveQuery } from 'dexie-react-hooks';
import { OutputProps, WithoutRef } from '~/types';

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

  const { lastCursor } = useCommands();

  const outputRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => outputRef.current!, []);

  const messages = useLiveQuery(async () => {
    const res = await db.history.filter((x) => x.id! > lastCursor).toArray();
    return res;
  }, [lastCursor]);

  return (
    <div
      ref={outputRef}
      className={cn('flex flex-col px-2 gap-0', className)}
      {...rest}
    >
      {(messages ?? []).map((message) => {
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
