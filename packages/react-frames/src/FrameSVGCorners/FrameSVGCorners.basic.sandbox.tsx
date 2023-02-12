import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGCorners } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 300,
      height: 300
    }}>
      <FrameSVGCorners
        shapesStyle={{ color: 'hsl(180, 75%, 10%)' }}
        polylinesStyle={{ color: 'hsl(180, 75%, 50%)' }}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
