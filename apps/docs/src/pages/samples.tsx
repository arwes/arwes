import { type ReactElement, useRef } from 'react';
import { DroneError } from 'iconoir-react';
import {
  Animator,
  Animated,
  FrameSVGLines,
  Illuminator,
  Text,
  aa,
  useFrameSVGAssemblingAnimation,
  aaVisibility,
  BleepsOnAnimator
} from '@arwes/react';

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <FrameSVGLines
      className='frame'
      elementRef={svgRef}
      onRender={onRender}
      smallLineWidth={3}
    />
  );
};

const Page = (): ReactElement => {
  return (
    <>
      <style jsx global>{`
        .container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .content {
          position: relative;
          display: grid;
          row-gap: 0.5rem;
          overflow: hidden;
          border: 1px solid transparent;
          padding: 2rem 4rem;
          text-align: center;
        }

        .frame {
          z-index: -1;
        }

        .frame path[data-name="decoration"] {
          color: hsl(0deg 100% 60%);
        }

        .frame path[data-name="shape"] {
          color: hsl(0deg 50% 10% / 0.5);
        }

        .icon {
          margin: 0;
          width: 4rem;
          height: 4rem;
          color: hsl(0deg 100% 70%);
        }

        .title {
          margin: 0;
          color: hsl(0deg 100% 60%);
          text-shadow: 0 0 2px hsl(0deg 100% 60%);
        }

        .description {
          margin: 0;
          color: hsl(0deg 50% 85%);
        }
      `}</style>

      <Animator combine manager='stagger'>
        <div className='container'>
          <Animated as='main' className='content' animated={[aa('y', 24, 0)]}>
            <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
              <Frame />
              <Illuminator color='hsl(0deg 50% 50% / 0.05)' />
              <BleepsOnAnimator transitions={{ entering: 'error' }} continuous />
            </Animator>
            <Animator>
              <Animated
                animated={[aaVisibility(), {
                  transitions: {
                    entering: { y: [24, 0], options: { delay: 0.4 } },
                    exiting: { y: 0 }
                  }
                }]}
              >
                <DroneError role='presentation' className='icon' />
                <h1 className='title'>Samples</h1>
              </Animated>
            </Animator>
            <Animator duration={{ delay: 0.4 }}>
              <Text className='description' fixed>
                The framework samples are under specification.
              </Text>
            </Animator>
          </Animated>
        </div>
      </Animator>
    </>
  );
};

export default Page;
