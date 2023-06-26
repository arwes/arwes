import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Puffs } from '@arwes/react-bgs';

const Sandbox = (): ReactElement => {
  return (
    <Animator duration={{ enter: 0.5, exit: 0.5, interval: 3 }}>
      <Puffs
        color='hsla(120, 100%, 75%, 0.5)'
        quantity={1000}
        padding={20}
        xOffset={[50, -100]}
        yOffset={[50, -100]}
        radiusOffset={[4, 0]}
      />
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
