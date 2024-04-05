import React from 'react';

type Props = React.ComponentPropsWithoutRef<'div'>;

const TerminalTitle = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <div ref={ref} {...rest} className='w-full'>
      {children ?? <div className='text-center'>React Terminal</div>}
    </div>
  );
});

export default TerminalTitle;

<TerminalTitle />;
