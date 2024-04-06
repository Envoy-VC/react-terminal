import React from 'react';

import { TerminalProvider } from '~/providers';
import { TerminalProps, WithoutRef } from '~/types';

import TerminalBox from './TerminalBox';

type Props = TerminalProps & WithoutRef<'div'>;

const Terminal = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <TerminalProvider>
      <TerminalBox {...rest} ref={ref} children={children} />
    </TerminalProvider>
  );
});

export default Terminal;
