import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '~/components/ui/button';

import { Command, Terminal, Theme, themes } from '@envoy1084/react-terminal';
import { ArrowUpRight } from 'lucide-react';

import BackgroundImage from '~/assets/background.jpeg';

const Home = () => {
  const commands: Command[] = [];
  const theme: Theme = { ...themes.poimandres, background: '#1b1e28f7' };
  return (
    <div className='relative h-screen w-full flex justify-center items-center'>
      <Image
        src={BackgroundImage}
        alt='Background Image'
        className='w-full h-full object-cover absolute z-[1]'
      />
      <div className='flex flex-col justify-center w-full z-[2] h-full'>
        <div className='w-full h-[7dvh] flex justify-end items-center px-8'>
          <Button asChild>
            <Link href='/docs' className='flex items-center gap-2'>
              Documentation
              <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
        <div className='flex py-32 justify-center h-full w-full'>
          <Terminal
            className='aspect-video max-w-5xl border-none w-full h-fit'
            theme={theme}
            commands={commands}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
