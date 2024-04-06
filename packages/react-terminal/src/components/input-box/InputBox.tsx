import { FC, forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '~/lib/utils';

import { WithoutRef } from '~/types';

import Prompt from './Prompt';
import TextArea from './TextArea';

type Props = WithoutRef<'div'>;

interface InputBoxComponent extends FC<Props> {
  /**
   * The Prompt component.
   *
   * @example
   * ```tsx
   * <TerminalInputBox.Prompt>
   *   <span className='text-blue-400'>{'>>>'}</span>
   * </TerminalInputBox.Prompt>
   * ```
   */
  Prompt: typeof Prompt;
  /**
   * The TextArea component.
   *
   * @example
   * ```tsx
   * <TerminalInputBox.TextArea cursor='block' />
   */
  TextArea: typeof TextArea;
}

/**
 * Represents an input box component.
 *
 * @group Components
 * @example
 * ```tsx
 * <TerminalInputBox>
 *   <TerminalInputBox.Prompt />
 *   <TerminalInputBox.TextArea cursor='underscore' />
 * </TerminalInputBox>
 * ```
 */
const InputBox: InputBoxComponent = Object.assign(
  forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, className, ...rest } = props;

    const boxRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => boxRef.current!, []);

    return (
      <div
        className={cn(
          'flex flex-row justify-start gap-1 px-2 text-base items-start leading-5',
          className
        )}
        ref={boxRef}
        {...rest}
      >
        {children}
      </div>
    );
  }),
  {
    Prompt,
    TextArea,
  }
);

InputBox.Prompt = Prompt;
InputBox.TextArea = TextArea;

export default InputBox;
