import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorNode, AnimatorInterface } from '@arwes/animator';
import { Animator, useAnimator } from '@arwes/react-animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator() as AnimatorInterface;

  useEffect(() => {
    animator.node.subscribers.add((node: AnimatorNode): void => {
      const element = elementRef.current as HTMLElement;
      const { duration } = node.control.getSettings();

      switch (node.state) {
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
