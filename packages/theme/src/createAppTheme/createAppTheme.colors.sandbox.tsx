import React, { type ReactElement, Fragment, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import { type AppTheme, createAppTheme } from '@arwes/theme';

const Sandbox = (): ReactElement => {
  const t: AppTheme = useMemo(() => createAppTheme(), []);

  return (
    <Fragment>
      <Global styles={{
        html: {
          margin: '0.5rem',
          lineHeight: 1.5,
          color: '#aaa',
          backgroundColor: '#111'
        },
        h1: {
          margin: 0,
          color: '#eee'
        },
        h2: {
          margin: 0,
          color: '#ddd'
        },
        h3: {
          margin: 0,
          color: '#ccc'
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
