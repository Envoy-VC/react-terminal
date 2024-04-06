import React, { useImperativeHandle, useRef } from 'react';

import { WithoutRef } from '~/types';

type Props = WithoutRef<'div'>;

const Prompt = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...rest } = props;

  const promptRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => promptRef.current!, []);

  return (
    <div ref={promptRef} {...props}>
      {children ?? <span className='!text-blue-500'>$</span>}
    </div>
  );
});

export default Prompt;
