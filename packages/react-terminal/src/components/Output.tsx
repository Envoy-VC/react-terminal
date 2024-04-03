import { useTerminalContext } from '~/lib/hooks';

import { AnsiUp } from 'ansi_up';

import { TerminalHistory } from '~/types/db';

interface Props {
  output: TerminalHistory[];
}

interface AnsiRendererProps {
  text: string;
}

const AnsiRenderer = ({ text }: AnsiRendererProps) => {
  const ansi = new AnsiUp();
  ansi.use_classes = true;
  let html = ansi.ansi_to_html(text);

  return (
    <div
      className='whitespace-pre-wrap'
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

const Output = ({ output }: Props) => {
  const {
    fontSize,
    htmlRenderer: HTMLRenderer,
    inputBox: { prompt },
    disableAnsi,
  } = useTerminalContext();

  return (
    <div className='flex flex-col px-2 gap-0'>
      {output.map((message) => {
        const { type, value, id } = message;
        if (type === 'command') {
          return (
            <div
              key={id}
              className='flex flex-row gap-1'
              style={{
                fontSize: fontSize,
              }}
            >
              {prompt}
              <div>{value}</div>
            </div>
          );
        } else {
          if (typeof value === 'object') {
            const htmlString = value.html;
            return <HTMLRenderer key={message.id} htmlString={htmlString} />;
          } else {
            if (disableAnsi) {
              return (
                <div
                  key={message.id}
                  className='whitespace-pre'
                  style={{
                    fontSize: fontSize,
                  }}
                >
                  {value}
                </div>
              );
            } else {
              return <AnsiRenderer text={value ?? ''} />;
            }
          }
        }
      })}
    </div>
  );
};

export default Output;
