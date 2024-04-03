import { useTerminalContext } from '~/lib/hooks';

import { TerminalHistory } from '~/types/db';

interface Props {
  output: TerminalHistory[];
}

const Output = ({ output }: Props) => {
  const {
    fontSize,
    htmlRenderer: HTMLRenderer,
    inputBox: { prompt },
  } = useTerminalContext();

  return (
    <div className='flex flex-col px-2 gap-0'>
      {output.map((message, index) => {
        const type = message.type;
        if (type === 'command') {
          return (
            <div
              key={message.id}
              className='flex flex-row gap-1'
              style={{
                fontSize: fontSize,
              }}
            >
              {prompt}
              <div>{message.value}</div>
            </div>
          );
        } else {
          const content = message.value;
          if (typeof content === 'string') {
            return (
              <div
                key={message.id}
                className='whitespace-pre'
                style={{
                  fontSize: fontSize,
                }}
              >
                {content}
              </div>
            );
          } else if (typeof content === 'object') {
            const htmlString = content.html;
            return <HTMLRenderer key={message.id} htmlString={htmlString} />;
          }
        }
      })}
    </div>
  );
};

export default Output;
