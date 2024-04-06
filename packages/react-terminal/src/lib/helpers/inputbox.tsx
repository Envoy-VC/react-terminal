import { AllRequired, PromptProps } from '~/types';

export const constructInputBoxProps = (
  props: PromptProps
): AllRequired<PromptProps> => {
  const inputBoxProps: AllRequired<PromptProps> = {
    prompt: <span className='!text-blue-500'>$</span>,
    ...props,
  };

  return inputBoxProps;
};
