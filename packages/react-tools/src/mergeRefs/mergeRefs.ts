import type { ForwardedRef } from 'react';

const mergeRefs = <T = HTMLDivElement | null>(...refs: Array<ForwardedRef<T> | undefined>) => {
  return (value: T) => {
    refs.filter(Boolean).forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      }
      else if (ref && typeof ref === 'object') {
        ref.current = value;
      }
    });
  };
};

export { mergeRefs };
