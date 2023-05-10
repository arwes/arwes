import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

const Item = (): ReactElement => {
  return (
    <Animator>
      <Animated
        style={{ margin: 10, width: 40, height: 20 }}
        animated={{
          initialStyle: { backgroundColor: '#777' },
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
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tid1 = setTimeout(() => setActive(true), 1000);
    const tid2 = setTimeout(() => setShow(true), 1200);

    return () => {
      clearTimeout(tid1);
      clearTimeout(tid2);
    };
  }, []);

  return (
    <Animator active={active} manager='stagger' combine>
      {Array(show ? 20 : 10).fill(0).map((_, index) => <Item key={index} />)}
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
