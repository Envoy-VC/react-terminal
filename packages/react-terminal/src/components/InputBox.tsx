import React from 'react';

import { calculateTextAreaHeight } from '~/lib/helpers';
import { cn } from '~/lib/utils';

import { InputBoxProps } from '~/types';

export const defaultPrompt = (
  <span className='text-sky-500 font-medium'>$</span>
);

const InputBox = React.forwardRef<HTMLTextAreaElement, InputBoxProps>(
  ({ prompt = defaultPrompt, className, ...props }, ref) => {
    const [text, setText] = React.useState<string>('');

    const textAreaHeight = React.useMemo(
      () => calculateTextAreaHeight(text),
      [text]
    );

    const handleTextChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setText(event.target.value);
    };

    return (
      <div className='flex flex-row justify-start gap-1 p-2 text-base items-start leading-5'>
        {prompt}
        <textarea
          ref={ref}
          autoFocus
          value={text}
          onChange={handleTextChange}
          spellCheck={false}
          className={cn(
            'bg-background border-none outline-none resize-none w-full hide-scrollbar',
            className
          )}
          style={{ height: textAreaHeight }}
          {...props}
        />
      </div>
    );
  }
);

export default InputBox;
