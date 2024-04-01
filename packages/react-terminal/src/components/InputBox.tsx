import React from 'react';

import { db } from '~/lib/db';
import {
  calculateTextAreaHeight,
  defaultPrompt,
  getCursor,
} from '~/lib/helpers';
import { useCopyRef, useTerminal, useTerminalContext } from '~/lib/hooks';
import { cn } from '~/lib/utils';

import { InputBoxProps } from '~/types';

const InputBox = React.forwardRef<HTMLTextAreaElement, InputBoxProps>(
  (
    { prompt = defaultPrompt, cursor = 'underscore', className, ...props },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const textareaRef = useCopyRef(ref);
    const mirrorRef = React.useRef<HTMLDivElement>(null);

    const {
      text,
      commandIndex,
      isExecuting,
      refocus,
      setText,
      setCommandIndex,
    } = useTerminalContext();
    const { handler } = useTerminal();

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

    const handleSelectionChange = () => {
      const textarea = textareaRef.current;
      const mirrorEle = mirrorRef.current;

      if (!mirrorEle) {
        return;
      }
      const cursorPos = textarea.selectionStart ?? 0;
      const textBeforeCursor = textarea.value.substring(0, cursorPos);
      const textAfterCursor = textarea.value.substring(cursorPos);

      setAfterText(textAfterCursor);
      setBeforeText(textBeforeCursor);
    };

    const handleFocus = () => {
      setIsFocussed(true);
    };

    const handleBlur = () => {
      setIsFocussed(false);
    };

    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [refocus]);

    React.useEffect(() => {
      if (isFocused) {
        handleSelectionChange();
      }
    }, [isFocused]);

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
      <div className='flex flex-row justify-start gap-1 px-2 text-base items-start leading-5'>
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
