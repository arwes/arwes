import type { ReactNode, ReactElement } from 'react';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { BleepsManagerProps } from '@arwes/bleeps';
import { BleepsProvider, useBleeps } from '@arwes/react-bleeps';

type BleepsNames = 'click' | 'toggle';

interface ButtonProps {
  name: BleepsNames
  children: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
  const { name, children } = props;
  const bleeps = useBleeps<BleepsNames>();
  const onClick = (): void => bleeps[name]?.play();
  return <button onClick={onClick}>{children}</button>;
};

const Sandbox = (): ReactElement => {
  const [settings] = useState<BleepsManagerProps<BleepsNames>>({
    master: {
      volume: 0.75
    },
    bleeps: {
      click: {
        sources: [{ src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }]
      },
      toggle: {
        sources: [{ src: '/assets/sounds/toggle.mp3', type: 'audio/mpeg' }]
      }
    }
  });

  return (
    <BleepsProvider {...settings}>
      <Button name='click'>Click!</Button>
      {' '}
      <Button name='toggle'>Toggle!</Button>
    </BleepsProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
