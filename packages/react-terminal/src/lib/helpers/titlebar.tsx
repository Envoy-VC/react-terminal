import { ActionGroupProps, AllRequired } from '~/types';

export const constructTitlebarProps = (
  props: ActionGroupProps
): AllRequired<ActionGroupProps> => {
  const titlebarProps: AllRequired<ActionGroupProps> = {
    closeHandler: () => {},
    minimizeHandler: () => {},
    maximizeHandler: () => {},
    ...props,
  };

  return titlebarProps;
};
