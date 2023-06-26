import React, { type ReactElement, Profiler, Fragment, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { type AnimatorNode } from '@arwes/animator';
import { AnimatorGeneralProvider, Animator, useAnimator } from '@arwes/react-animator';

const TEST_RENDER_NUMBER = 3000;

const TEST_ON_RENDER = (id: string, phase: string, duration: number): void => {
  if (phase === 'mount') {
    console.log(`mount: ${duration} ms`);
  }
};

const Item = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator();

  useEffect(() => {
    animator?.node.subscribers.add((node: AnimatorNode) => {
      const element = elementRef.current as HTMLDivElement;

      switch (node.state) {
        case 'exited': element.style.opacity = '0.05'; break;
        case 'entering': element.style.opacity = '0.5'; break;
        case 'exiting': element.style.opacity = '0.5'; break;
        case 'entered': element.style.opacity = '1'; break;
      }
    });
  }, []);

  return <div ref={elementRef} className='item' />;
};

const Test = (): ReactElement => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tid = setInterval(() => setActive(v => !v), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Fragment>
      <p>Root animator state: <b>{active ? 'activated' : 'inactivated'}</b></p>
      <AnimatorGeneralProvider duration={{ enter: 0.5, exit: 0.5 }}>
        <Animator active={active} combine>
          <div className='items'>
            {Array(TEST_RENDER_NUMBER).fill(null).map((_, index) =>
              <Animator
                key={index}
                onTransition={(node: AnimatorNode) => {
                  const state = node.state;
                  if (index === 0) {
                    console.time(state);
                  }
                  else if (index + 1 === TEST_RENDER_NUMBER) {
                    console.timeEnd(state);
                  }
                }}
              >
                <Item />
              </Animator>
            )}
          </div>
        </Animator>
      </AnimatorGeneralProvider>
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
