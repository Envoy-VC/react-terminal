import React from 'react';

import { SquareTerminal } from 'lucide-react';

const Logo = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <SquareTerminal size={36} />
      <div className='text-2xl font-medium md:block hidden'>React Terminal</div>
    </div>
  );
};

export default Logo;
