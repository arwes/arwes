/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement, useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { FrameSVGHexagon, useFrameSVGAssemblingAnimation } from '@arwes/react-frames';

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <div css={{
      position: 'relative',
      width: 300,
      height: 150,

      '& path[data-name="shape"]': {
        color: 'hsl(180, 75%, 10%)',
        filter: 'drop-shadow(0 0 4px hsl(180, 75%, 10%))'
      },
      '& path[data-name="decoration"]': {
        color: 'hsl(180, 75%, 50%)',
        filter: 'drop-shadow(0 0 4px hsl(180, 75%, 50%))'
      }
    }}>
      <FrameSVGHexagon
        elementRef={svgRef}
        onRender={onRender}
        padding={4}
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
