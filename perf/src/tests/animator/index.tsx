/* @jsx jsx */
import { ReactElement, Profiler, useState, useRef, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { render } from 'react-dom';
import { Animator, useAnimator } from '@arwes/animator';

const testsRendersNumber = 1000;
const onTestsRender = (id: string, phase: string, duration: number): void => {
  if (phase === 'mount') {
    console.log(`mount: ${duration} ms`);
  }
};

const Test = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator();

  animator?.setupAnimateRefs(elementRef);

  return <div className='item' ref={elementRef} />;
};

const App = (): ReactElement => {
  const [activate, setActivate] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <Profiler id='test' onRender={onTestsRender}>
      <Animator animator={{ activate }}>
        {Array(testsRendersNumber).fill(null).map((_, index) =>
          <Animator
            key={index}
            animator={{
              duration: { enter: 500, exit: 500 },
              onAnimateEntering: (animator, elementRef: any) => {
                elementRef.current.style.opacity = 1;

                if (index === 0) {
                  console.time('allAnimationsEntering');
                }
                else if (index + 1 === testsRendersNumber) {
                  console.timeEnd('allAnimationsEntering');
                }
              },
              onAnimateExiting: (animator, elementRef: any) => {
                elementRef.current.style.opacity = 0;

                if (index === 0) {
                  console.time('allAnimationsExiting');
                }
                else if (index + 1 === testsRendersNumber) {
                  console.timeEnd('allAnimationsExiting');
                }
              }
            }}
          >
            <Test />
          </Animator>
        )}
      </Animator>
    </Profiler>
  );
};

render(<App />, document.querySelector('#root'));
