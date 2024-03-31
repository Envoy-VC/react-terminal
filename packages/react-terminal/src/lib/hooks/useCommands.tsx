import React from 'react';

import { useLocalStorage } from 'usehooks-ts';
import { Command } from '~/types';

import { db } from '../db';

const useCommands = () => {
  const [lastCursor, setLastCursor] = useLocalStorage('lastCursor', 0);

  const defaultCommands: Command[] = [
    {
      name: 'clear',
      handler: async () => {
        const last = await db.history.count();
        setLastCursor(last);
        return undefined;
      },
      waitForExecution: false,
    },
  ];

  return { defaultCommands };
};

export default useCommands;
