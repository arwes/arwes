import React, { ReactNode, ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorSystemNode, AnimatorProps, Animator, useAnimator, AnimatorInterface } from '@arwes/animator';

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
            { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
            { duration: duration?.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            element,
            { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] },
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
      style={{ margin: 10, width: 40, height: 20, backgroundColor: '#0ff' }}
    />
  );
};

interface ItemProps {
  animator?: AnimatorProps
  children?: ReactNode
}

const Item = (props: ItemProps): ReactElement => {
  return (
    <Animator {...props.animator}>
      <AnimatorUIListener />
      <div style={{ marginLeft: 20 }}>
        {props.children}
      </div>
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
    <Animator active={active}>
      <Item>
        <AnimatorUIListener />
        <Item />
        <Item />
        <Item />
      </Item>

      <div style={{ height: 50 }} />

      <Item animator={{ combine: true }}>
        <AnimatorUIListener />
        <Item />
        <Item />
        <Item />
      </Item>
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);