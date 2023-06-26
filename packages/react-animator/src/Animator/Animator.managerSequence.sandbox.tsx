import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

const Item = (): ReactElement => {
  return (
    <Animator duration={{ enter: 0.15 }}>
      <Animated
        style={{ margin: 10, width: 40, height: 20, backgroundColor: '#777' }}
        animated={{
          transitions: {
            entering: { x: [0, 100], backgroundColor: ['#0ff', '#ff0'] },
            exiting: { x: [100, 0], backgroundColor: ['#ff0', '#0ff'] }
          }
        }}
        hideOnExited={false}
      />
    </Animator>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active} manager='sequence' combine>
      {Array(10).fill(0).map((_, i) => <Item key={i} />)}
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
