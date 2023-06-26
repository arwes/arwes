import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeColor } from '@arwes/theme';

// All colors will work from 0 to 20 variant/multiplier index.
const colors = [
  // Variations of hue.
  createThemeColor(i => [i * 18, 50, 50, 1]),
  // Variations of saturation.
  createThemeColor(i => [180, i * 5, 50, 1]),
  // Variations of lightness.
  createThemeColor(i => [180, 50, i * 5, 1]),
  // Variations of opacity.
  createThemeColor(i => [180, 50, 50, i * 0.05])
];

const Sandbox = (): ReactElement => {
  return (
    <div>
      {Array(4).fill(0).map((_, colorIndex) => (
        <div
          key={colorIndex}
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {Array(20).fill(0).map((_, variantIndex) => (
            <div
              key={variantIndex}
              style={{
                width: 20,
                height: 100,
                background: colors[colorIndex](variantIndex)
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
