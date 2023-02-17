/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement, useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { FrameSVGPentagon, useFrameSVGAssemblingAnimation } from '@arwes/react-frames';

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <div css={{
      position: 'relative',
      width: 300,
      height: 150,

      '& path[data-name="shape"]': {
        color: 'hsl(180, 75%, 10%)'
      },
      '& path[data-name="polyline"]': {
        color: 'hsl(180, 75%, 50%)'
      }
    }}>
      <FrameSVGPentagon
        elementRef={svgRef}
        onRender={onRender}
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
