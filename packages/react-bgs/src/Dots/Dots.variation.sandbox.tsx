import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Dots } from '@arwes/react-bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 1200);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1 }}>
      <Dots
        color='hsla(60, 100%, 75%, 0.25)'
        type='circle'
        distance={20}
        size={2}
        // x=0% y=100% or left-bottom corner.
        origin={[0, 1]}
        originInverted
      />
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
