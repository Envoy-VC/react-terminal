import React from 'react';

import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { themes, useTerminal } from '@envoy1084/react-terminal';

type ThemeValue = keyof typeof themes;

const Settings = () => {
  const { fontSize, setTheme, setFontSize, setPrompt } = useTerminal();
  return (
    <div className='flex flex-row w-full gap-2 items-center'>
      <div className='flex flex-row items-center gap-2'>
        <div>Theme: </div>
        <Select
          onValueChange={(v) => setTheme(themes[v as ThemeValue])}
          defaultValue='poimandres'
        >
          <SelectTrigger className='w-[14rem]'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(themes).map((t) => (
              <SelectItem value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div>Font Size: </div>
        <Input
          type='number'
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className='w-[4rem]'
        />
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div>Prompt: </div>
        <Input
          defaultValue={'$'}
          onChange={(e) => setPrompt(e.target.value)}
          className='w-[10rem]'
        />
      </div>
    </div>
  );
};

export default Settings;
