import React, { type ReactElement, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { type FrameSVGPathGeneric } from '@arwes/frames';
import { FrameSVG } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  const paths: FrameSVGPathGeneric[] = useMemo(() => [
    // Background shape.
    {
      name: 'bg',
      style: {
        strokeWidth: 0,
        fill: 'hsl(180, 75%, 10%)',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 10%))'
      },
      path: [
        ['M', 20, 20],
        ['L', 20, '100% - 20'],
        ['L', '100% - 20', '100% - 20'],
        ['L', '100% - 20', 20]
      ]
    },
    // Top decoration.
    {
      name: 'line',
      style: {
        strokeWidth: '1',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'none',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      path: [
        ['M', 10, 10],
        ['L', '100% - 10', 10],
        ['L', '100% - 10', 40]
      ]
    },
    // Bottom decoration.
    {
      name: 'line',
      style: {
        strokeWidth: '2',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'none',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      path: [
        ['M', '100% - 10', '100% - 10'],
        ['L', 10, '100% - 10'],
        ['L', 10, '100% - 40']
      ]
    }
  ], []);

  return (
    <div style={{ position: 'absolute', inset: 20 }}>
      <FrameSVG paths={paths} />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
