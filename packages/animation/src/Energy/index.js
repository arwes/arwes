import React from 'react';
import { useAnimation } from '../useAnimation';
import { useEnergy } from '../useEnergy';
import { Component } from './Energy.component';

const Energy = React.forwardRef((props, ref) => {
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

Energy.displayName = 'Energy';

export { Energy };
