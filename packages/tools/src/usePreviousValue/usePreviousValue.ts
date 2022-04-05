import { useEffect, useRef } from 'react';

const usePreviousValue = <V>(newValue: V): V => {
  const previousValueRef = useRef<V>(newValue);

  useEffect(() => {
    previousValueRef.current = newValue;
  }, [newValue]);

  return previousValueRef.current;
};

export { usePreviousValue };
