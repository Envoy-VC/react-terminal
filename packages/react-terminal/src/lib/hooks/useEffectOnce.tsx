import React from 'react';

import { Awaitable } from '~/types';

const useEffectOnce = (effect: Awaitable<void>) => {
  React.useEffect(() => {
    effect();
  }, []);
};

export default useEffectOnce;
