import React, { useImperativeHandle } from 'react';

import { constructTitlebarProps } from '~/lib/helpers/titlebar';
import { useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { ChevronsUpDown, Minus, X } from 'lucide-react';
import { Awaitable, TitleBarProps } from '~/types';

type Props = TitleBarProps & React.ComponentProps<'div'>;

const TitleBar = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const titlebarRef = React.useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => titlebarRef.current!, []);

  const { className, children, ...rest } = props;
  const {
    setTitleBarProps,
    showTitleBar,
    closeHandler,
    maximizeHandler,
    minimizeHandler,
    header,
    extraContent,
  } = useTerminalContext();

  React.useEffect(() => {
    const titlebarProps = constructTitlebarProps(props);
    setTitleBarProps(titlebarProps);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 border-b w-full border-border h-fit px-4 flex flex-row items-center justify-between py-1 bg-background',
        className
      )}
      {...rest}
    >
      {children ? (
        children
      ) : showTitleBar ? (
        <>
          <div className='flex flex-row gap-[6px] items-center group' ref={ref}>
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
          {header}
          {extraContent}
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

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

export default TitleBar;
