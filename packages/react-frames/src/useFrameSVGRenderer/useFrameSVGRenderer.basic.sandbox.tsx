import React, { type ReactElement, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { renderFrameSVGPaths } from '@arwes/frames';
import { useFrameSVGRenderer } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement>(null);

  const onSVGRender = useCallback((svg: SVGSVGElement, width: number, height: number) => {
    renderFrameSVGPaths(svg, width, height, [
      {
        style: {
          fill: 'hsl(180, 50%, 10%)'
        },
        path: [
          ['M', 0, 0],
          ['L', '100%', 0],
          ['L', '50%', '100%'],
          'Z'
        ]
      }
    ]);
  }, []);

  useFrameSVGRenderer(svgRef, onSVGRender);

  return (
    <svg
      ref={svgRef}
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      style={{
        display: 'block',
        width: 300,
        height: 300
      }}
    />
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
