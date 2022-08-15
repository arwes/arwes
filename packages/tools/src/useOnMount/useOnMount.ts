import { useEffect, useRef } from 'react';

const useOnMount = (callback: (() => void)): void => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return callback();
    }
  }, []);
};

export { useOnMount };
