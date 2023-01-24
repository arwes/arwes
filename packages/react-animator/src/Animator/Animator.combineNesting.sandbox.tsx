import React, { ReactNode, ReactElement, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { animate } from 'motion';
import { AnimatorInterface } from '@arwes/animator';
import { AnimatorProps, Animator, useAnimator, AnimatorGeneralProvider } from '@arwes/react-animator';

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
            { duration: duration.enter, easing: 'linear' }
          );
          break;
        }
        case 'exiting': {
          animate(
            element,
            { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] },
            { duration: duration.exit, easing: 'linear' }
          );
          break;
        }
      }
    });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ margin: 5, width: 40, height: 15, backgroundColor: '#0ff' }}
    />
  );
};

interface ItemProps extends AnimatorProps {
  children?: ReactNode
}

const Item = ({ children, ...animator }: ItemProps): ReactElement => {
  return (
    <Animator {...animator}>
      <AnimatorUIListener />
      <div style={{ marginLeft: 20 }}>
        {children}
      </div>
    </Animator>
  );
};

const Sandbox = (): ReactElement => {
  return (
    <AnimatorGeneralProvider duration={{ enter: 0.8, stagger: 0.2 }}>
      <Item manager='sequence' combine>

        <Item manager='parallel' combine>
          {Array(5).fill(0).map((_, i) => <Item key={i} />)}
        </Item>

        <Item manager='stagger' combine>
          {Array(5).fill(0).map((_, i) => <Item key={i} />)}
        </Item>

        <Item manager='sequence' combine>
          {Array(5).fill(0).map((_, i) => <Item key={i} />)}
        </Item>

      </Item>
    </AnimatorGeneralProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
