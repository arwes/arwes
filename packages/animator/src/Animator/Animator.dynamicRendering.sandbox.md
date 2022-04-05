```tsx
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { animate } from 'motion';
import { Animator, useAnimator } from '@arwes/animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator();

  useEffect(() => {
    animator.node.subscribers.add(node => {
      const { duration } = node.control.getSettings();

      switch (node.getState()) {
        case 'entering': {
          animate(
            elementRef.current,
            { x: [0, 100], backgroundColor: ['#0ff', '#ff0'] },
            { duration: duration.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            elementRef.current,
            { x: [100, 0], backgroundColor: ['#ff0', '#0ff'] },
            { duration: duration.enter }
          );
          break;
        }
      }
    });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ margin: 10, width: 40, height: 20, backgroundColor: '#0ff' }}
    />
  );
};

const Item = (): ReactElement => {
  return (
    <Animator>
      <AnimatorUIListener />
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

render(<Sandbox />, document.querySelector('#root'));
```
