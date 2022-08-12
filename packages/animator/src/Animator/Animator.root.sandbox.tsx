// A child Animator as root, will create a new system of Animator nodes.

import React, { ReactNode, ReactElement, StrictMode, useState, useRef, useEffect } from 'react';
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
  const [active1, setActive1] = useState(true); // Start as activated.
  const [active2, setActive2] = useState(false); // Start as deactivated.

  useEffect(() => {
    const tid = setTimeout(() => {
      setActive1(!active1);
      setActive2(!active2);
    }, 2000);
    return () => clearTimeout(tid);
  }, [active1]); // (Only read one to prevent race condition error.)

  return (
    <Animator active={active1} combine>
      <Item>
        <Item>
          <Item>
            <Item />
            <Item />
          </Item>
          <Item>
            <Item />
            <Item />
          </Item>
        </Item>
        <Item>
          <Item animator={{ root: true, active: active2 }}>
            <Item />
            <Item />
          </Item>
          <Item>
            <Item />
            <Item />
          </Item>
        </Item>
      </Item>

    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<StrictMode><Sandbox /></StrictMode>);
