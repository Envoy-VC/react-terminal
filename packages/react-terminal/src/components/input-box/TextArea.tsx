import React, { useImperativeHandle, useRef } from 'react';

import { getCursor } from '~/lib/helpers/terminal';
import { calculateTextAreaHeight } from '~/lib/helpers/terminal';
import { useEffectOnce, useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { TextareaProps, WithoutRef } from '~/types';

type Props = TextareaProps & WithoutRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { cursor, children, className, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textareaRef.current!, []);
  const { text, fontSize, setText } = useTerminalContext();

  const [beforeText, setBeforeText] = React.useState<string>('');
  const [afterText, setAfterText] = React.useState<string>('');
  const [isFocused, setIsFocussed] = React.useState<boolean>(false);

  const handleFocus = () => {
    setIsFocussed(true);
  };

  const handleBlur = () => {
    setIsFocussed(false);
  };

  const textAreaHeight = React.useMemo(
    () => calculateTextAreaHeight(text, fontSize),
    [text]
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSelectionChange = () => {
    const textarea = textareaRef.current;
    const mirrorEle = mirrorRef.current;

    if (!mirrorEle) {
      return;
    }
    const cursorPos = textarea?.selectionStart ?? 0;
    const textBeforeCursor = textarea?.value.substring(0, cursorPos) ?? '';
    const textAfterCursor = textarea?.value.substring(cursorPos) ?? '';

    setAfterText(textAfterCursor);
    setBeforeText(textBeforeCursor);
  };

  React.useEffect(() => {
    if (isFocused) {
      handleSelectionChange();
    }
  }, [isFocused]);

  return (
    <div
      className='relative w-full bg-transparent'
      style={{ height: textAreaHeight }}
      ref={containerRef}
    >
      <div
        ref={mirrorRef}
        className='absolute top-0 left-0 h-full w-full overflow-hidden text-transparent whitespace-pre'
      >
        {beforeText}
        {isFocused && getCursor(cursor)}
        {afterText}
      </div>
      <textarea
        // disabled={isExecuting}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSeeking={handleSelectionChange}
        onSelect={handleSelectionChange}
        ref={textareaRef}
        autoFocus
        // onKeyDown={handleKeyPress}
        value={text}
        onChange={handleTextChange}
        spellCheck={false}
        className={cn(
          'border-none outline-none resize-none w-full hide-scrollbar h-full caret-transparent bg-transparent',
          className
        )}
        {...rest}
      />
    </div>
  );
});

export default TextArea;
