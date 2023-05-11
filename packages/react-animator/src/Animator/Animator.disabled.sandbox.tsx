// An Animator disabled will not its animator interface so the components
// expecting it to subscribe to will not be able to do so.
// Children animators will work as root animators since they don't receive a valid
// parent animator to subscribe to.
// The option is useful for removing all components animations which
// depend on the animator transitions.

import React, { type ReactNode, type ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { Animator, type AnimatorProps, useAnimator } from '@arwes/react-animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator();

  useEffect(() => {
    // If the Animator is disabled, it will provide an undefined value.
    if (!animator) {
      return;
    }

    animator.node.subscribe(node => {
      const element = elementRef.current as HTMLElement;
      const { duration } = node;

      switch (node.state) {
        case 'entering': {
          animate(
            element,
            { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
            { duration: duration.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            element,
            { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] },
            { duration: duration.exit }
          );
          break;
        }
      }
    });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ margin: 10, width: 40, height: 20, backgroundColor: '#777' }}
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
    <Animator active={active} combine>
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
        <Item animator={{ disabled: true }}>
          <Item />
          <Item />
        </Item>
        <Item>
          <Item />
          <Item />
        </Item>
      </Item>
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
