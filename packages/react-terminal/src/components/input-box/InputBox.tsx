import React, { FC, forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '~/lib/utils';

import { WithoutRef } from '~/types';

import Prompt from './Prompt';
import TextArea from './TextArea';

type Props = WithoutRef<'div'>;

interface InputBoxComponent extends FC<Props> {
  Prompt: typeof Prompt;
  TextArea: typeof TextArea;
}

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

export default InputBox;
