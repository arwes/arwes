import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatedX } from '@arwes/react-animated';

const Sandbox = (): ReactElement => {
  const [position, setPosition] = useState('a');

  useEffect(() => {
    const tid = setInterval(() => setPosition(p => {
      switch (p) {
        case 'a': return 'b';
        case 'b': return 'c';
        default: return 'a';
      }
    }), 1000);
    return () => clearInterval(tid);
  }, []);

  return (
    <AnimatedX
      style={{ margin: 10, width: 50, height: 50, backgroundColor: '#777' }}
      state={position}
      animated={{
        initialStyle: { x: 0, backgroundColor: '#0ff' },
        transitions: {
          a: { x: 0, backgroundColor: '#0ff', duration: 0.8, easing: 'ease-in-out' },
          b: { x: 100, backgroundColor: '#ff0', options: { duration: 0.8, easing: 'ease-in-out' } },
          c: { x: 200, backgroundColor: '#f0f' }
        }
      }}
    />
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
