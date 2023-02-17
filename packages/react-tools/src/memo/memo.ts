import { memo as reactMemo } from 'react';

const memo = <C>(
  component: C,
  comparator?: ((prevProps: Readonly<object>, nextProps: Readonly<object>) => boolean)
): C => {
  return reactMemo(component as any, comparator) as any as C;
};

export { memo };
