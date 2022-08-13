import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorSystemNode, Animator, useAnimator, AnimatorInterface } from '@arwes/animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator() as AnimatorInterface;

  useEffect(() => {
    const subscriber = (node: AnimatorSystemNode): void => {
      const element = elementRef.current as HTMLElement;
      const { duration } = node.control.getSettings();

      switch (node.getState()) {
        case 'entering': {
          animate(
            element,
            { x: [0, 100], backgroundColor: ['#0ff', '#ff0'] },
            { duration: duration?.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            element,
            { x: [100, 0], backgroundColor: ['#ff0', '#0ff'] },
            { duration: duration?.enter }
          );
          break;
        }
      }
    };

    animator.node.subscribers.add(subscriber);

    return () => {
      animator.node.subscribers.delete(subscriber);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ margin: 10, width: 40, height: 40, backgroundColor: '#0ff' }}
    />
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active}>
      <AnimatorUIListener />
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);
