import { useRef, useEffect } from 'react';

const useOnUpdate = (callback: () => void, dependencies: unknown[] = []): void => {
  const isFirstRef = useRef(true);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    callback();
  }, dependencies);
};

export { useOnUpdate };
