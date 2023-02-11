import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGHexagon } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'absolute',
      width: 300,
      height: 300
    }}>
      <FrameSVGHexagon
        shapesStyle={{ color: 'hsl(185, 75%, 10%)' }}
        polylinesStyle={{ color: 'hsl(185, 75%, 50%)' }}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
