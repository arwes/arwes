import React, { type ReactElement, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { type FRAME_SVG_PATH_GENERIC } from '@arwes/frames';
import { FrameSVG } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  const paths: FRAME_SVG_PATH_GENERIC[] = useMemo(() => [
    {
      style: {
        strokeWidth: '2',
        stroke: 'hsl(0, 75%, 50%)',
        fill: 'hsl(0, 75%, 10%)',
        filter: 'drop-shadow(0 0 2px hsl(0, 75%, 50%))'
      },
      path: [
        ['M', 10, 30],
        ['A', 20, 20, 0, 0, 1, 50, 30],
        ['A', 20, 20, 0, 0, 1, 90, 30],
        ['Q', 90, 60, 50, 90],
        ['Q', 10, 60, 10, 30],
        'z'
      ]
    }
  ], []);

  return (
    <div style={{ position: 'relative', width: 100, height: 100 }}>
      <FrameSVG paths={paths} />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
