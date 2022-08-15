import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { Puffs } from '@arwes/bgs';

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

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);
