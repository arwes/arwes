import { memo as reactMemo } from 'react';

const memo = <C>(component: C): C => {
  return reactMemo(component as any) as any as C;
};

export { memo };
