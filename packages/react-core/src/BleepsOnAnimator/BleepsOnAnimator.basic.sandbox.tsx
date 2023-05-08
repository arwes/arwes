import type { ReactElement } from 'react';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Animated, aa } from '@arwes/react-animated';
import type { BleepsManagerProps } from '@arwes/bleeps';
import { BleepsProvider } from '@arwes/react-bleeps';
import { BleepsOnAnimator } from '@arwes/react-core';

type BleepsNames = 'click' | 'assemble';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  const [settings] = useState<BleepsManagerProps<BleepsNames>>({
    master: {
      volume: 0.75
    },
    bleeps: {
      click: {
        sources: [{ src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }]
      },
      assemble: {
        sources: [{ src: '/assets/sounds/assemble.mp3', type: 'audio/mpeg' }],
        loop: true
      }
    }
  });

  return (
    <BleepsProvider {...settings}>
      <Animator active={active}>
        <Animated
          style={{ margin: 10, width: 40, height: 40 }}
          animated={[aa('x', 0, 100), aa('background', '#0ff', '#ff0')]}
        />
        <BleepsOnAnimator<BleepsNames>
          transitions={{
            entering: 'click',
            exiting: 'assemble'
          }}
        />
      </Animator>
    </BleepsProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
