import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { db } from '~/lib/db';
import { calculateTextAreaHeight, getCursor } from '~/lib/helpers';
import { useCommands, useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { TextareaProps, WithoutRef } from '~/types';

type Props = TextareaProps & WithoutRef<'textarea'>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { cursor, children, className, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textareaRef.current!, []);
  const {
    text,
    fontSize,
    commandIndex,
    isExecuting,
    setText,
    setCommandIndex,
  } = useTerminalContext();
  const { handler } = useCommands();

  const [beforeText, setBeforeText] = useState<string>('');
  const [afterText, setAfterText] = useState<string>('');
  const [isFocused, setIsFocussed] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocussed(true);
  };

  const handleBlur = () => {
    setIsFocussed(false);
  };

  const textAreaHeight = useMemo(
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

  useEffect(() => {
    if (isFocused) {
      handleSelectionChange();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isExecuting === false && text === '') {
      textareaRef.current?.focus();
    }
  }, [isExecuting, text]);

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      textareaRef.current?.blur();
      setCommandIndex(-1);
      await handler();
    } else if (event.key === 'Enter' && event.shiftKey) {
      const newText = text + '\n';
      setText(newText);
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const commands = await db.history
        .where({ type: 'command' })
        .reverse()
        .toArray();

      if (commands.length === 0) return;

      let newIndex: number;

      if (event.key === 'ArrowUp') {
        newIndex = commandIndex + 1;
      } else {
        newIndex = commandIndex - 1;
      }

      if (newIndex >= commands.length || newIndex < 0) return;

      setCommandIndex(newIndex);

      const command = commands[newIndex];
      if (command && command.type === 'command') {
        setText(command.value);
      }
    }
  };

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
        id='terminal-input-textarea'
        disabled={isExecuting}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSeeking={handleSelectionChange}
        onSelect={handleSelectionChange}
        ref={textareaRef}
        autoFocus
        onKeyDown={handleKeyPress}
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
