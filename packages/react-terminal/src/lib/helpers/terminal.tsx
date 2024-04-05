import { ThreeDotsMoving } from 'react-svg-spinners';

import { useTerminalContext } from '~/lib/hooks';

import { JSXRenderer } from '~/components';
import { AllRequired, Command, InputBoxProps } from '~/types';

import { themes } from '../themes';

import { TerminalProps } from '~/types/terminal';

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

const msg = `Welcome to React Terminal!

Type 'help' to see the list of available commands.
`;

const defaultWelcomeMessage = (
  <div className='whitespace-pre-wrap px-2'>{msg}</div>
);

export const constructTerminalProps = (
  props: TerminalProps
): AllRequired<TerminalProps> => {
  const terminalProps: AllRequired<TerminalProps> = {
    theme: props.theme ?? themes.poimandres,
    //showWelcomeMessage: props.showWelcomeMessage ?? true,
    //welcomeMessage: props.welcomeMessage ?? defaultWelcomeMessage,
    fontSize: props.fontSize ?? 16,
    autoScroll: props.autoScroll ?? true,
    // showTitleBar: props.showTitleBar ?? true,
    // titleBar: {
    //   header: <div className='text-sm'>React Terminal</div>,
    //   closeHandler: () => {},
    //   minimizeHandler: () => {},
    //   maximizeHandler: () => {},
    //   extraContent: <div className='invisible'>a</div>,
    //   ...props.titleBar,
    // },
    // titleBarProps: { ...props.titleBarProps },
    // executingLoader: props.executingLoader ?? <DefaultLoader />,
    commands: props.commands ?? [],
    disableDefaultCommands: props.disableDefaultCommands ?? false,
    // disableAnsi: props.disableAnsi ?? false,
    // inputBox: {
    //   prompt: defaultPrompt,
    //   cursor: 'underscore',
    //   ...props.inputBox,
    // },
    // inputBoxProps: { ...props.inputBoxProps },
    // defaultHandler: props.defaultHandler ?? {
    //   name: 'default',
    //   handler: (_, command) => {
    //     return `${command}: command not found`;
    //   },
    // },
    // htmlRenderer: props.htmlRenderer ?? JSXRenderer,
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

export const HelpCommand = ({ commands }: { commands: Command[] }) => {
  return (
    <div className='flex flex-col'>
      <div className='py-2 font-semibold'>Available Commands: </div>
      <div className='flex flex-col'>
        {commands.map((command) => {
          const { name, description, args } = command;
          const hasArgs = args && args.length > 0;
          return (
            <div className='flex flex-row items-start gap-1'>
              <div className='basis-2/6 w-full'>
                <div className='flex flex-row items-start gap-2'>
                  <div>{name}</div>
                  {hasArgs && <div className='ansi-blue-fg'>|</div>}
                  <div>{args?.join(', ')}</div>
                </div>
              </div>
              <div className='w-full basis-4/6'>{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
