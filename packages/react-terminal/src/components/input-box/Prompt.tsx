import { forwardRef, useImperativeHandle, useRef } from 'react';

import { constructInputBoxProps } from '~/lib/helpers/inputbox';
import { useEffectOnce, useTerminalContext } from '~/lib/hooks';

import { WithoutRef } from '~/types';

type Props = WithoutRef<'div'>;

const Prompt = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props;

  const prompt = children ?? <span className='!text-blue-500'>$</span>;

  const { setPromptProps } = useTerminalContext();

  const promptRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => promptRef.current!, []);

  useEffectOnce(() => {
    setPromptProps(constructInputBoxProps({ prompt }));
  });

  return (
    <div ref={promptRef} {...rest}>
      {prompt}
    </div>
  );
});

export default Prompt;
