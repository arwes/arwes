/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { useRef, useEffect } from 'react';

import { useOnMount } from '../useOnMount/index';
import { usePreviousValue } from '../usePreviousValue/index';

type ICancel = () => void;
type ICallback = (() => ICancel | undefined | void);

const useOnChange = (callback: ICallback, dependencies: unknown[] = []): void => {
  const isFirstRef = useRef(true);
  const lastCallRef = useRef<ICancel | undefined | void>(undefined);
  const prevDependencies = usePreviousValue(dependencies);

  useEffect(() => {
    const isDiff = prevDependencies.some((prevDep, index) => prevDep !== dependencies[index]);

    if (isDiff && lastCallRef.current && !isFirstRef.current) {
      lastCallRef.current();
      lastCallRef.current = undefined;
    }

    if (isDiff || isFirstRef.current) {
      lastCallRef.current = callback();
    }

    isFirstRef.current = false;
  }, dependencies);

  useOnMount(() => {
    return () => {
      if (lastCallRef.current) {
        lastCallRef.current();
        lastCallRef.current = undefined;
      }
    };
  });
};

export { useOnChange };
