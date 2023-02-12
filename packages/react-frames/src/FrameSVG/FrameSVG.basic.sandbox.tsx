import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVG } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'absolute',
      inset: 20
    }}>
      <FrameSVG
        polylines={[
          // Background shape.
          {
            name: 'bg',
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
            name: 'top',
            style: {
              strokeWidth: 1,
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
            name: 'bottom',
            style: {
              strokeWidth: 2,
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
        ]}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
