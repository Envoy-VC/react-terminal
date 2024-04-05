import { AllRequired, TitleBarProps } from '~/types';

export const constructTitlebarProps = (
  props: TitleBarProps
): AllRequired<TitleBarProps> => {
  const titlebarProps: AllRequired<TitleBarProps> = {
    showTitleBar: props.showTitleBar ?? true,
    header: <div className='text-sm'>React Terminal</div>,
    closeHandler: () => {},
    minimizeHandler: () => {},
    maximizeHandler: () => {},
    extraContent: <div className='invisible'>a</div>,
    ...props,
  };

  return titlebarProps;
};
