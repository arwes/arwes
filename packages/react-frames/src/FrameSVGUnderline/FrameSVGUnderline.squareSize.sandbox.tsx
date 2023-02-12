import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGUnderline } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 300,
      height: 300
    }}>
      <FrameSVGUnderline
        squareSize={32}
        strokeWidth={3}
        shapesStyle={{ color: 'hsl(60, 75%, 10%)' }}
        polylinesStyle={{ color: 'hsl(60, 75%, 50%)' }}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
