import React, { type ReactElement, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { renderFrameSVGPaths } from '@arwes/frames';
import { useFrameSVGRenderer } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  const clipPathId = 'clipPathId';
  const contentId = 'contentId';
  const svgRef = useRef<SVGSVGElement>(null);

  const onSVGRender = useCallback((svg: SVGSVGElement, width: number, height: number) => {
    const clipPathElement = svg.querySelector(`#${clipPathId}`) as SVGElement;
    const contentElement = svg.querySelector(`#${contentId}`) as SVGElement;

    // Render tetragon shape element to clip content.
    renderFrameSVGPaths(clipPathElement, width, height, [
      [
        ['M', 20, 20],
        ['L', 20, '100% - 20'],
        ['L', '100% - 20', '50% + 100'],
        ['L', '100% - 20', '50% - 100'],
        'Z'
      ]
    ]);
    // The actual rendered clipped elements.
    renderFrameSVGPaths(contentElement, width, height, [
      {
        style: {
          fill: 'hsla(180, 50%, 10%)'
        },
        path: [
          ['M', 0, 0],
          ['L', '100%', 0],
          ['L', '100%', '100%'],
          ['L', 0, '100%'],
          'Z'
        ]
      }
    ]);
  }, []);

  useFrameSVGRenderer(svgRef, onSVGRender);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 500,
        overflow: 'hidden'
      }}
    >
      <svg
        ref={svgRef}
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          <clipPath id={clipPathId} />
        </defs>
        <g
          id={contentId}
          style={{ clipPath: `url(#${clipPathId})` }}
        />
      </svg>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
