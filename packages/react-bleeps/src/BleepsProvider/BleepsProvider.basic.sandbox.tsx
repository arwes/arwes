import React, { type ReactNode, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { type BleepsProviderSettings, BleepsProvider, useBleeps } from '@arwes/react-bleeps';

type BleepsNames = 'click' | 'intro';

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

const bleepsSettings: BleepsProviderSettings<BleepsNames> = {
  master: {
    volume: 0.75
  },
  bleeps: {
    click: {
      sources: [{ src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }]
    },
    intro: {
      sources: [{ src: '/assets/sounds/intro.mp3', type: 'audio/mpeg' }]
    }
  }
};

const Sandbox = (): ReactElement => {
  return (
    <BleepsProvider {...bleepsSettings}>
      <Button name='click'>Click!</Button>
      {' '}
      <Button name='intro'>Intro!</Button>
    </BleepsProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
