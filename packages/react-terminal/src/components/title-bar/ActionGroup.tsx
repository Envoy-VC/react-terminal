import React, { useImperativeHandle } from 'react';

import { ChevronsUpDown, Minus, X } from 'lucide-react';
import { Awaitable, TerminalActionGroupProps, WithoutRef } from '~/types';

type Props = TerminalActionGroupProps & WithoutRef<'div'>;

const ActionGroup = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    maximizeHandler,
    closeHandler,
    minimizeHandler,
    children,
    className,
    ...rest
  } = props;

  const actionGroupRef = React.useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => actionGroupRef.current!, []);

  if (children) return children;

  return (
    <div
      className='absolute flex flex-row gap-[6px] items-center group'
      ref={ref}
      {...rest}
    >
      {actionButtons.map((action) => {
        const { Icon, color, name } = action;
        let handler: Awaitable<void>;
        if (name === 'close') handler = closeHandler!;
        else if (name === 'minimize') handler = minimizeHandler!;
        else handler = maximizeHandler!;

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
  );
});

ActionGroup.displayName = 'TitleBarActionGroup';

const actionButtons = [
  {
    name: 'close',
    color: '#fe5f58',
    Icon: X,
  },
  {
    name: 'minimize',
    color: '#ffcc00',
    Icon: Minus,
  },
  {
    name: 'maximize',
    color: '#28cd41',
    Icon: ChevronsUpDown,
  },
];

export default ActionGroup;
