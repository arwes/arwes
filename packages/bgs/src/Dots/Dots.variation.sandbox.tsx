import React, { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { Dots } from '@arwes/bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 1200);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1 }}>
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        <Dots
          color='hsla(60, 100%, 75%, 0.25)'
          type='circle'
          distance={20}
          size={2}
          // x=0% y=100% or left-bottom corner.
          origin={[0, 1]}
          originInverted
        />
      </div>
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);
