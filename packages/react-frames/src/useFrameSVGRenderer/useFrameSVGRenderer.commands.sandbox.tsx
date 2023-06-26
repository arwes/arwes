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
          strokeWidth: '2',
          stroke: 'hsl(0, 75%, 50%)',
          fill: 'hsl(0, 75%, 10%)',
          filter: 'drop-shadow(0 0 2px hsl(0, 75%, 50%))'
        },
        path: [
          ['M', 10, 30],
          ['A', 20, 20, 0, 0, 1, 50, 30],
          ['A', 20, 20, 0, 0, 1, 90, 30],
          ['Q', 90, 60, 50, 90],
          ['Q', 10, 60, 10, 30],
          'z'
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
        width: 100,
        height: 100
      }}
    />
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
