/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement, useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { FrameSVGKranox, useFrameSVGAssemblingAnimation } from '@arwes/react-frames';

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <div css={{
      position: 'relative',
      width: 300,
      height: 500,

      '[data-name=bg]': {
        color: 'hsl(60, 75%, 10%)',
        filter: 'drop-shadow(0 0 4px hsl(60, 75%, 10%))'
      },
      '[data-name=line]': {
        color: 'hsl(60, 75%, 50%)',
        filter: 'drop-shadow(0 0 4px hsl(60, 75%, 50%))'
      }
    }}>
      <FrameSVGKranox
        elementRef={svgRef}
        onRender={onRender}
        padding={4}
        strokeWidth={2}
        squareSize={12}
        smallLineLength={12}
        largeLineLength={48}
      />
    </div>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active}>
      <Frame />
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
