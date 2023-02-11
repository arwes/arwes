import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVG } from '@arwes/react-core';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'absolute',
      left: 20,
      right: 20,
      top: 20,
      bottom: 20
    }}>
      <FrameSVG
        shapes={[
          // Background shape.
          [
            [20, 20],
            [20, '100% - 20'],
            ['100% - 20', '100% - 20'],
            ['100% - 20', 20]
          ]
        ]}
        shapesStyle={{
          color: 'hsl(185, 75%, 10%)',
          filter: 'drop-shadow(0 0 4px hsl(185, 75%, 10%))'
        }}
        polylines={[
          // Top polyline.
          [
            [10, 10],
            ['100% - 10', 10],
            ['100% - 10', 40]
          ],
          // Bottom polyline.
          {
            polyline: [
              ['100% - 10', '100% - 10'],
              [10, '100% - 10'],
              [10, '100% - 40']
            ],
            style: { strokeWidth: 2 }
          }
        ]}
        polylinesStyle={{
          color: 'hsl(185, 75%, 50%)',
          filter: 'drop-shadow(0 0 2px hsl(185, 75%, 50%))'
        }}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
