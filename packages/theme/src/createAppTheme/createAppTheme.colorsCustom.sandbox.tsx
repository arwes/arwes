import React, { type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import {
  type AppTheme,
  type AppThemeSettingsPalette,
  createAppTheme
} from '@arwes/theme';

// Custom color palette generator.
const createThemePalette = (hue: number): AppThemeSettingsPalette => ({
  // Darkening colors.
  main: (i: number) => [hue, 80 + i, 92.5 - i * 9.44],
  text: (i: number) => [hue, 10, 92.5 - i * 9.44],

  // Lightening colors.
  bg: (i: number) => [hue, 10, 2 + i * 2],
  ol: (i: number) => [hue, 80 + 1, 2 + i * 2],
  deco: (i: number) => [hue, 80 + 1, 50, 0.025 + i * 0.025]
});

const t: AppTheme = createAppTheme({
  settings: {
    hues: {
      primary: 160,
      secondary: 280
    },
    colors: {
      primary: createThemePalette(160),
      secondary: createThemePalette(280)
    }
  }
});

const Sandbox = (): ReactElement => {
  return (
    <Fragment>
      <Global styles={{
        html: {
          margin: '0.5rem',
          lineHeight: 1.5,
          color: '#ddd',
          backgroundColor: '#111'
        },
        'h1, h2, h3': {
          margin: 0
        }
      }} />

      <h1><code>colors</code></h1>

      {(Object.keys(t.colors) as unknown as Array<keyof AppTheme['colors']>).map(colorName => (
        <div key={colorName}>
          <h2><code>{colorName}</code></h2>

          {(Object.keys(t.colors[colorName]) as unknown as Array<keyof AppTheme['colors'][typeof colorName]>).map(variant => (
            <div key={variant}>
              <h3>{variant}</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                {Array(10).fill(null).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      height: 40,
                      backgroundColor: t.colors[colorName][variant](index)
                    }}
                    title={`theme.colors.${String(colorName)}.${String(variant)}(${index}) = ${t.colors[colorName][variant](index)}`}
                  >
                    <code>{index}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
