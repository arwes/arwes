/* @jsx jsx */
import { ReactElement, Profiler, useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { render } from 'react-dom';
import { Animator } from '@arwes/animator';
import { Animated } from '@arwes/animated';

const testsRendersNumber = 1000;
const onTestsRender = (id: string, phase: string, duration: number): void => {
  if (phase === 'mount') {
    console.log(`mount: ${duration} ms`);
  }
};

const Test = (): ReactElement => {
  const [activate, setActivate] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <Animator animator={{ activate, duration: { enter: 500, exit: 500 } }}>
      {Array(testsRendersNumber).fill(null).map((_, index) => (
        <Animated
          key={index}
          className='parent'
          animated={{
            initialStyles: { rotate: 90 },
            entering: { rotate: 0 },
            exiting: { rotate: 90 }
          }}
        >
          <Animated
            className='child child1'
            animated={{
              initialStyles: { opacity: 0.5 },
              entering: { opacity: 1 },
              exiting: { opacity: 0.5 }
            }}
          />
          <Animated
            className='child child2'
            animated={{
              initialStyles: { opacity: 0.5 },
              entering: { opacity: 1 },
              exiting: { opacity: 0.5 }
            }}
          />
          <Animated
            className='child child3'
            animated={{
              initialStyles: { opacity: 0.5 },
              entering: { opacity: 1 },
              exiting: { opacity: 0.5 }
            }}
          />
        </Animated>
      ))}
    </Animator>
  );
};

const App = (): ReactElement => {
  return (
    <Profiler id='test' onRender={onTestsRender}>
      <Test />
    </Profiler>
  );
};

render(<App />, document.querySelector('#root'));
