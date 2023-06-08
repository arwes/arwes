import React, { type ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { type AnimatorInterface } from '@arwes/animator';
import {
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  Animator,
  useAnimator
} from '@arwes/react-animator';

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

const animatorGeneralSettings: AnimatorGeneralProviderSettings = {
  disabled: false,
  duration: { enter: 0.1, exit: 0.1, stagger: 0.3 }
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(v => !v), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <AnimatorGeneralProvider {...animatorGeneralSettings}>
      <Animator active={active} manager='stagger'>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Animator>
    </AnimatorGeneralProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
