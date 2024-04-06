import React, { FC, useImperativeHandle } from 'react';

import { cn } from '~/lib/utils';

import { WithoutRef } from '~/types';

import ActionGroup from './ActionGroup';
import Title from './Title';

type Props = WithoutRef<'div'>;

interface TitleBarComponent extends FC<Props> {
  ActionGroup: typeof ActionGroup;
  Title: typeof Title;
}

const TitleBar: TitleBarComponent = Object.assign(
  React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const titlebarRef = React.useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => titlebarRef.current!, []);

    const { className, children, ...rest } = props;

    return (
      <div
        className={cn(
          'sticky top-0 border-b w-full border-border h-fit px-4 py-1 bg-background flex flex-row items-center',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }),
  {
    Title,
    ActionGroup,
  }
);

TitleBar.Title = Title;
TitleBar.ActionGroup = ActionGroup;

export default TitleBar;
