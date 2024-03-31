import React from 'react';

import { calculateTextAreaHeight } from '~/lib/helpers';
import { useCopyRef } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { InputBoxProps } from '~/types';

export const defaultPrompt = (
  <span className='text-sky-500 font-medium'>$</span>
);

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

const InputBox = React.forwardRef<HTMLTextAreaElement, InputBoxProps>(
  (
    { prompt = defaultPrompt, cursor = 'underscore', className, ...props },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const textareaRef = useCopyRef(ref);
    const mirrorRef = React.useRef<HTMLDivElement>(null);

    const [text, setText] = React.useState<string>('');

    const [beforeText, setBeforeText] = React.useState<string>('');
    const [afterText, setAfterText] = React.useState<string>('');
    const [isFocused, setIsFocussed] = React.useState<boolean>(false);

    const textAreaHeight = React.useMemo(
      () => calculateTextAreaHeight(text),
      [text]
    );

    const handleTextChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setText(event.target.value);
    };

    const handleSelectionChange = React.useCallback(() => {
      console.log('selection change');
      const textarea = textareaRef.current;
      const mirrorEle = mirrorRef.current;

      if (!mirrorEle) {
        return;
      }
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPos);
      const textAfterCursor = textarea.value.substring(cursorPos);

      setAfterText(textAfterCursor);
      setBeforeText(textBeforeCursor);
    }, [textareaRef, mirrorRef]);

    const handleFocus = () => {
      setIsFocussed(true);
    };

    const handleBlur = () => {
      setIsFocussed(false);
    };

    return (
      <div className='flex flex-row justify-start gap-1 p-2 text-base items-start leading-5'>
        {prompt}
        <div
          className='relative w-full'
          style={{ height: textAreaHeight }}
          ref={containerRef}
        >
          {isFocused && (
            <div
              ref={mirrorRef}
              className='absolute top-0 left-0 h-full w-full overflow-hidden text-transparent whitespace-pre'
            >
              {beforeText}
              {getCursor(cursor)}
              {afterText}
            </div>
          )}
          <textarea
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSeeking={handleSelectionChange}
            onSelect={handleSelectionChange}
            ref={textareaRef}
            autoFocus
            value={text}
            onChange={handleTextChange}
            spellCheck={false}
            className={cn(
              'bg-background border-none outline-none resize-none w-full hide-scrollbar h-full caret-transparent',
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

export default InputBox;
