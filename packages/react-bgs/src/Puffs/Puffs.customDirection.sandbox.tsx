import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Puffs } from '@arwes/react-bgs';

const Sandbox = (): ReactElement => {
  return (
    <Animator
      duration={{
        enter: 0.5,
        exit: 0.5,
        interval: 1.5,
        // Duration between one interval animation and the next.
        intervalPause: 1
      }}
    >
      <Puffs
        color='hsla(60, 100%, 75%, 0.5)'
        quantity={100}
        padding={0}
        // Move to the right.
        xOffset={[10, 50]}
        // Move to the top.
        yOffset={[-20, -80]}
        // Change of puff radius.
        radiusOffset={[4, 20]}
        // 1 set per interval animation.
        sets={1}
      />
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
