import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatedX } from '@arwes/react-animated';

const Sandbox = (): ReactElement => {
  return (
    <AnimatedX
      style={{ margin: 10, width: 50, height: 50, backgroundColor: '#777' }}
      state={undefined} // No state provided.
      animated={{
        initialStyle: { x: 0, backgroundColor: '#0ff' },
        transitions: {
          a: { x: 0, backgroundColor: '#0ff' },
          b: { x: 100, backgroundColor: '#ff0' },
          c: { x: 200, backgroundColor: '#f0f' }
        }
      }}
    />
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
