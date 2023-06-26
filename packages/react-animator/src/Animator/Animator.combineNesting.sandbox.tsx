import React, { type ReactNode, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { type AnimatorProps, Animator, AnimatorGeneralProvider } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

interface ItemProps extends AnimatorProps {
  children?: ReactNode
}

const Item = ({ children, ...animator }: ItemProps): ReactElement => {
  return (
    <Animator {...animator}>
      <Animated
        style={{ margin: 5, width: 40, height: 15, backgroundColor: '#777' }}
        animated={{
          transitions: {
            entering: {
              x: [0, 50],
              backgroundColor: ['#0ff', '#ff0'],
              options: { easing: 'linear' }
            },
            exiting: {
              x: [50, 0],
              backgroundColor: ['#ff0', '#0ff'],
              options: { easing: 'linear' }
            }
          }
        }}
        hideOnExited={false}
      />
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
