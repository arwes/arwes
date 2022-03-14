/* @jsx jsx */
import { ReactElement, Profiler } from 'react';
import { jsx } from '@emotion/react';
import { render } from 'react-dom';
import { ArwesThemeProvider, StylesBaseline, Checkbox } from '@arwes/core';

const testsRendersNumber = 1000;
const onTestsRender = (id: string, phase: string, duration: number): void => {
  if (phase === 'mount') {
    console.log(`mount: ${duration} ms`);
    console.time('animations');
  }
};
const onAnimationsComplete = (): void => {
  console.timeEnd('animations');
};

const App = (): ReactElement => {
  return (
    <ArwesThemeProvider>

      <StylesBaseline
        styles={{
          'html, body': {
            fontFamily: 'monospace'
          }
        }}
      />

      <Profiler id='test' onRender={onTestsRender}>
        {Array(testsRendersNumber).fill(null).map((_, index) => (
          <Checkbox
            key={index}
            css={{
              display: 'inline-block',
              margin: 1
            }}
            animator={index + 1 === testsRendersNumber
              ? { onAnimateEntered: onAnimationsComplete }
              : undefined
            }
          />
        ))}
      </Profiler>

    </ArwesThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
