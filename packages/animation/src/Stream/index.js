import React from 'react';
import { useAnimation } from '../useAnimation';
import { useEnergy } from '../useEnergy';
import { Component } from './Stream.component';

const Stream = React.forwardRef((props, ref) => {
  const animationContext = useAnimation();
  const parentEnergyContext = useEnergy();

  return (
    <Component
      animationContext={animationContext}
      parentEnergyContext={parentEnergyContext}
      {...props}
      ref={ref}
    />
  );
});

Stream.displayName = 'Stream';

export { Stream };
