// A child Animator as root, will create a new system of Animator nodes.

import React, { ReactNode, ReactElement, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorInterface } from '@arwes/animator';
import { Animator, AnimatorProps, useAnimator } from '@arwes/react-animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator() as AnimatorInterface;

  useEffect(() => {
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
    <Animator active={active} combine>
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
          <Item animator={{ root: true, active: !active }}>
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

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
