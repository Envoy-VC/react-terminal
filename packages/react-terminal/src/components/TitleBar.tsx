import React from 'react';

import { ChevronsUpDown, Plus, X } from 'lucide-react';
import { Awaitable } from '~/types';

interface TitleBarProps {
  title?: React.ReactNode;
  closeHandler?: Awaitable<void>;
  minimizeHandler?: Awaitable<void>;
  maximizeHandler?: Awaitable<void>;
  extraContent?: React.ReactNode;
}

const actionButtons = [
  {
    name: 'close',
    color: '#fe5f58',
    Icon: X,
  },
  {
    name: 'minimize',
    color: '#ffcc00',
    Icon: Plus,
  },
  {
    name: 'maximize',
    color: '#28cd41',
    Icon: ChevronsUpDown,
  },
];

const TitleBar: React.FC<TitleBarProps> = ({
  title,
  closeHandler = () => {},
  minimizeHandler = () => {},
  maximizeHandler = () => {},
  extraContent,
}) => {
  return (
    <div className='border-b w-full border-border h-fit px-4 flex flex-row items-center justify-between py-1'>
      <div className='flex flex-row gap-1 items-center group'>
        {actionButtons.map((action) => {
          const { Icon, color, name } = action;
          let handler: Awaitable<void>;
          if (name === 'close') handler = closeHandler;
          else if (name === 'minimize') handler = minimizeHandler;
          else handler = maximizeHandler;

          return (
            <button
              key={name}
              className='border-none w-3 h-3 rounded-full flex items-center justify-center'
              onClick={handler}
              style={{
                backgroundColor: color,
              }}
            >
              <Icon
                size={10}
                className='text-black/90 opacity-0 group-hover:opacity-100 transition-all duration-50 ease-linear '
                strokeWidth={2.2}
              />
            </button>
          );
        })}
      </div>
      {title ? title : <div className='text-sm'>React Terminal</div>}
      {extraContent ? extraContent : <div className='invisible'>a</div>}
    </div>
  );
};

export default TitleBar;
