import React from 'react';

type Props = React.ComponentPropsWithoutRef<'div'>;

const TerminalTitle = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <div ref={ref} {...rest}>
      {children ?? 'React Terminal'}
    </div>
  );
});

export default TerminalTitle;

<TerminalTitle />;
