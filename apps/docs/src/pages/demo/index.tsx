import React from 'react';

import { Terminal } from '@envoy1084/react-terminal';

const Demo = () => {
  return (
    <div className='flex py-12 justify-center items-center mx-auto'>
      <Terminal
        commands={[]}
        className='!aspect-video max-w-screen-lg w-full'
      />
    </div>
  );
};

export default Demo;
