import React, { type ReactElement, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { type FRAME_SVG_POLYLINE_GENERIC } from '@arwes/frames';
import { FrameSVG } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  const polylines: FRAME_SVG_POLYLINE_GENERIC[] = useMemo(() => [
    // Background shape.
    {
      name: 'shape',
      style: {
        strokeWidth: 0,
        fill: 'hsl(180, 75%, 10%)',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 10%))'
      },
      polyline: [
        [20, 20],
        [20, '100% - 20'],
        ['100% - 20', '100% - 20'],
        ['100% - 20', 20]
      ]
    },
    // Top polyline.
    {
      name: 'polyline',
      style: {
        strokeWidth: '1',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'transparent',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      polyline: [
        [10, 10],
        ['100% - 10', 10],
        ['100% - 10', 40]
      ]
    },
    // Bottom polyline.
    {
      name: 'polyline',
      style: {
        strokeWidth: '2',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'transparent',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      polyline: [
        ['100% - 10', '100% - 10'],
        [10, '100% - 10'],
        [10, '100% - 40']
      ]
    }
  ], []);

  return (
    <div style={{ position: 'absolute', inset: 20 }}>
      <FrameSVG polylines={polylines} />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
