import React, { type ReactElement, Profiler, Fragment, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { Animator } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

const TEST_RENDER_NUMBER = 1000;

const TEST_ON_RENDER = (id: string, phase: string, duration: number): void => {
  if (phase === 'mount') {
    console.log(`mount: ${duration} ms`);
  }
};

const Test = (): ReactElement => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), 1000);
    return () => clearTimeout(tid);
  }, [active]);

  return (
    <Fragment>
      <p>Root animator state: <b>{active ? 'active' : 'deactivated'}</b></p>
      <Animator
        active={active}
        duration={{ enter: 0.5, exit: 0.5 }}
      >
        {Array(TEST_RENDER_NUMBER).fill(null).map((_, index) => (
          <Animated
            key={index}
            className='item'
            animated={{
              initialStyle: {
                scale: 0.2,
                rotate: 90
              },
              transitions: {
                entering: { scale: [0.2, 1], rotate: [90, 0] },
                exiting: { scale: [1, 0.2], rotate: [0, 90] }
              }
            }}
          />
        ))}
      </Animator>
    </Fragment>
  );
};

const App = (): ReactElement => {
  return (
    <Profiler id='test' onRender={TEST_ON_RENDER}>
      <Test />
    </Profiler>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<App />);
