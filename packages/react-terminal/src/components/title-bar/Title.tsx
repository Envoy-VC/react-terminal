import { forwardRef, useRef } from 'react';
import { useImperativeHandle } from 'react';

import { WithoutRef } from '~/types';

type Props = WithoutRef<'div'>;

const Title = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => titleRef.current!, []);

  const { children, ...rest } = props;

  return (
    <div ref={titleRef} {...rest} className='w-full'>
      {children ?? <div className='text-center'>React Terminal</div>}
    </div>
  );
});

Title.displayName = 'TitleBarTitle';

export default Title;
