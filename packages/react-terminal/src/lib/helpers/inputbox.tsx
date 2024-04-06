import { AllRequired, PromptProps, TextareaProps } from '~/types';

export const constructInputBoxProps = (
  props: PromptProps
): AllRequired<PromptProps> => {
  const inputBoxProps: AllRequired<PromptProps> = {
    prompt: <span className='!text-blue-500'>$</span>,
    ...props,
  };

  return inputBoxProps;
};

export const getCursor = (type: TextareaProps['cursor']) => {
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

export const calculateTextAreaHeight = (text: string, fontSize: number) => {
  const rows = text.split('\n').length;
  const minHeight = fontSize * 1.5;
  const rowHeight = fontSize * 1.5;
  return `${Math.max(minHeight, rows * rowHeight)}px`;
};
