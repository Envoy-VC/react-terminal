import React from 'react';

import Image from 'next/image';

import LogoSmall from './../assets/icon.svg';
import LogoText from './../assets/logo.svg';

const Logo = () => {
  return (
    <>
      <Image
        src={LogoText}
        alt='React Terminal Logo'
        height={24}
        className='sm:block hidden'
      />
      <Image
        src={LogoSmall}
        alt='React Terminal Logo'
        height={24}
        className='sm:!hidden block'
      />
    </>
  );
};

export default Logo;
