import React from 'react';

import { db } from '~/lib/db';
import { useCommands, useTerminalContext } from '~/lib/hooks';

import { useLiveQuery } from 'dexie-react-hooks';

const Output = () => {
  const { prompt } = useTerminalContext();
  const { lastCursor } = useCommands();

  const output = useLiveQuery(async () => {
    const res = await db.history.filter((x) => x.id! > lastCursor).toArray();
    return res;
  }, [lastCursor]);

  return (
    <div className='flex flex-col px-2 gap-0'>
      {(output ?? []).map((message, index) => {
        const type = message.type;
        if (type === 'command') {
          return (
            <div key={index} className='flex flex-row gap-1'>
              {prompt}
              <div>{message.value}</div>
            </div>
          );
        } else {
          const content = message.value;
          if (typeof content === 'string') {
            return <div>{content}</div>;
          }
        }
      })}
    </div>
  );
};

export default Output;
