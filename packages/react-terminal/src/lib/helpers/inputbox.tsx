import { AllRequired, TextareaProps } from '~/types';

export const constructTextareaProps = (
  props: TextareaProps
): AllRequired<TextareaProps> => {
  const textareaProps: AllRequired<TextareaProps> = {
    cursor: 'underscore',
    ...props,
  };

  return textareaProps;
};
