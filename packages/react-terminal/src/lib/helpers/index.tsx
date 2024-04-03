import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminalContext } from '~/lib/hooks';

import {
  AllRequired,
  Command,
  HTMLRenderer,
  InputBoxProps,
  TerminalProps,
} from '~/types';

import { themes } from '../themes';

export * from './rehype';

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

export const fallbackHandler: Command = {
  name: 'fallback',
  handler: (_args, text) => {
    return `Command not found: ${text}`;
  },
};

export const constructTerminalProps = (
  props: TerminalProps
): AllRequired<TerminalProps> => {
  const renderer: HTMLRenderer = (a) => <>{a.htmlString}</>;
  const titleBar = props.titleBar;

  const terminalProps: AllRequired<TerminalProps> = {
    theme: props.theme ?? themes.poimandres,
    fontSize: props.fontSize ?? 16,
    showTitleBar: props.showTitleBar ?? true,
    titleBar: {
      header: <div className='text-sm'>React Terminal</div>,
      closeHandler: () => {},
      minimizeHandler: () => {},
      maximizeHandler: () => {},
      extraContent: <div className='invisible'>a</div>,
      ...titleBar,
    },
    titleBarProps: { ...props.titleBarProps },
    executingLoader: props.executingLoader ?? <DefaultLoader />,
    commands: props.commands ?? [],
    enableDefaultCommands: props.enableDefaultCommands ?? true,
    inputBox: {
      prompt: defaultPrompt,
      cursor: 'underscore',
      ...props.inputBox,
    },
    inputBoxProps: { ...props.inputBoxProps },
    defaultHandler: props.defaultHandler ?? {
      name: 'default',
      handler: (_, command) => {
        return `${command}: command not found`;
      },
    },
    htmlRenderer: props.htmlRenderer ?? renderer,
  };

  return terminalProps;
};

export const DefaultLoader = () => {
  const { fontSize } = useTerminalContext();

  return (
    <div
      className='flex flex-row items-center gap-[6px] px-2'
      style={{
        fontSize: fontSize - 2,
      }}
    >
      <ThreeDotsMoving
        color='var(--terminal-foreground)'
        width={(fontSize - 2) * 2}
        height={(fontSize - 2) * 2}
      />
      <span className='font-medium text-foreground leading-5'>
        Executing Command...
      </span>
    </div>
  );
};
