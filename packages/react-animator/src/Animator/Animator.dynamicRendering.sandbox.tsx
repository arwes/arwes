import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorInterface } from '@arwes/animator';
import { Animator, useAnimator } from '@arwes/react-animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator() as AnimatorInterface;

  useEffect(() => {
    animator.node.subscribers.add(node => {
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
