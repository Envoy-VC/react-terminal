import { Command } from '~/types';

export const fallbackHandler: Command = {
  name: 'fallback',
  handler: (_args, text) => {
    return `Command not found: ${text}`;
  },
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
