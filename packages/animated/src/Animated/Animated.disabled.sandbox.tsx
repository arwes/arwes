import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { Animated } from '@arwes/animated';

const Sandbox = (): ReactElement => {
  return (
    <Animator disabled>
      <Animated
        style={{ margin: 10, width: 40, height: 40, backgroundColor: '#777' }}
        animated={{
          initialStyle: { x: 0, backgroundColor: '#0ff' },
          transitions: {
            entering: { x: [0, 100], backgroundColor: '#ff0' },
            exiting: { x: [100, 0], backgroundColor: '#0ff' }
          }
        }}
      />
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);