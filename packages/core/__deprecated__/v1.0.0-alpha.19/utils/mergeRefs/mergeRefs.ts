import { MutableRefObject } from 'react';

type MergeRefsType <T> = MutableRefObject<T | null> | ((node: T) => void);

const mergeRefs = <T> (...refs: Array<MergeRefsType<T> | undefined>) => {
  return (node: T) => {
    refs.filter(Boolean).forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      }
      else if (typeof ref === 'object') {
        ref.current = node;
      }
    });
  };
};

export { mergeRefs };
