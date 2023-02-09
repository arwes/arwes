import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeColor } from '@arwes/theme';

// A function to return a HSLA value as [number, number, number, number?],
// representing [hue, saturation, lightness, alpha channel].
// See https://developer.mozilla.org/en-US/docs/web/css/color_value/hsla
// This specific function will create values for 0 to 20 multiplier value provided
// with variation of the lightness.
const color = createThemeColor(i => [180, 75, i * 5, 1]);

const Sandbox = (): ReactElement => {
  return (
    <div
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
            background: color(variantIndex)
          }}
        />
      ))}
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
