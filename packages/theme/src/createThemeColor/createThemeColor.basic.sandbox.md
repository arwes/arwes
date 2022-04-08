```tsx
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { createThemeColor } from '@arwes/theme';

const Sandbox = (): ReactElement => {
  // A function to return a HSLA value as [number, number, number, number?],
  // representing [hue, saturation, lightness, alpha channel].
  // See https://developer.mozilla.org/en-US/docs/web/css/color_value/hsla
  // This specific function will create values for 0 to 20 multiplier value provided
  // with variation of the lightness.
  const color = createThemeColor(i => [180, 75, i * 5, 1]);

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
}

render(<Sandbox />, document.querySelector('#root'));
```
