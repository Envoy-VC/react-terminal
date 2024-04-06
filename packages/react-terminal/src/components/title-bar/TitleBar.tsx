import { FC, forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '~/lib/utils';

import { WithoutRef } from '~/types';

import ActionGroup from './ActionGroup';
import Title from './Title';

type Props = WithoutRef<'div'>;

export interface TitleBarComponent extends FC<Props> {
  /**
   * The Action Group component.
   *
   * @public
   *
   * @example
   * ```tsx
   * <TerminalTitleBar.ActionGroup
   *   closeHandler={() => console.log('close')}
   *   minimizeHandler={() => console.log('minimize')}
   *   maximizeHandler={() => console.log('maximize')}
   * />
   * ```
   */
  ActionGroup: typeof ActionGroup;
  /**
   * Represents the Title component.
   *
   * @public
   *
   * @example
   * ```tsx
   * <TerminalTitleBar.Title>
   *    <div>My Terminal</div>
   * </TerminalTitleBar.Title>
   * ```
   */
  Title: typeof Title;
}

/**
 * Represents the TitleBar component.
 *
 * @group Components
 * @example
 * ```tsx
 *  <TerminalTitleBar>
 *    <TerminalTitleBar.ActionGroup
 *      closeHandler={() => console.log('close')}
 *      minimizeHandler={() => console.log('minimize')}
 *      maximizeHandler={() => console.log('maximize')}
 *    />
 *    <TerminalTitleBar.Title />
 *  </TerminalTitleBar>
 * ```
 */
const TitleBar: TitleBarComponent = Object.assign(
  forwardRef<HTMLDivElement, Props>((props, ref) => {
    const titlebarRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => titlebarRef.current!, []);

    const { className, children, ...rest } = props;

    return (
      <div
        ref={titlebarRef}
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
