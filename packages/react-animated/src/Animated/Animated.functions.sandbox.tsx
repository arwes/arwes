import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { Animator } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

const Item = (): ReactElement => {
  return (
    <Animator>
      <Animated
        style={{ margin: 10, width: 40, height: 20, backgroundColor: '#777' }}
        animated={{
          initialStyle: { backgroundColor: '#0ff' },
          transitions: {
            entering: ({ element, duration }) => animate(
              element,
              { x: [0, 100], backgroundColor: '#ff0' },
              { duration }
            ),
            exiting: ({ element, duration }) => animate(
              element,
              { x: [100, 0], backgroundColor: '#0ff' },
              { duration }
            )
          }
        }}
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
    <Animator active={active} manager='stagger' combine>
      {Array(10).fill(0).map((_, i) => <Item key={i} />)}
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
