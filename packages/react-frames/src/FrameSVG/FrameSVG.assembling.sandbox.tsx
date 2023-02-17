/** @jsx jsx */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { jsx } from '@emotion/react';
import { type ReactElement, useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { animate, type AnimationControls } from 'motion';
import { FrameSVGHexagon } from '@arwes/react-frames';
import { Animator, useAnimator } from '@arwes/react-animator';

const Frame = (): ReactElement => {
  const animator = useAnimator();
  const animationControlRef = useRef<AnimationControls | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!animator) {
      return;
    }

    const svg = svgRef.current as SVGSVGElement;
    const shapes = Array.from(svg.querySelectorAll('path[data-name="shape"]')) as SVGPathElement[];
    const polylines = Array.from(svg.querySelectorAll('path[data-name="polyline"]')) as SVGPathElement[];

    animator.node.subscribe(node => {
      const { duration } = node;

      animationControlRef.current?.cancel();

      switch (node.state) {
        case 'exited': {
          shapes.concat(polylines).forEach(path => {
            path.style.opacity = '0';
            path.style.strokeDasharray = '';
            path.style.strokeDashoffset = '';
          });
          break;
        }

        case 'entering': {
          for (const polyline of polylines) {
            const length = polyline.getTotalLength();
            polyline.style.opacity = '1';
            polyline.style.strokeDasharray = String(length);
            polyline.dataset.length = String(length);
          }

          animationControlRef.current = animate(
            progress => {
              for (const shape of shapes) {
                shape.style.opacity = String(progress);
              }

              for (const polyline of polylines) {
                const length = Number(polyline.dataset.length);
                polyline.style.strokeDashoffset = String((1 - progress) * length);
              }
            },
            { duration: duration.enter }
          );
          break;
        }

        case 'entered': {
          shapes.concat(polylines).forEach(path => {
            path.style.opacity = '1';
            path.style.strokeDasharray = '';
            path.style.strokeDashoffset = '';
          });
          break;
        }

        case 'exiting': {
          for (const polyline of polylines) {
            const length = polyline.getTotalLength();
            polyline.style.strokeDasharray = String(length);
            polyline.dataset.length = String(length);
          }

          animationControlRef.current = animate(
            progress => {
              for (const shape of shapes) {
                shape.style.opacity = String(1 - progress);
              }

              for (const polyline of polylines) {
                const length = Number(polyline.dataset.length);
                polyline.style.strokeDashoffset = String(progress * length);
              }
            },
            { duration: duration.exit }
          );
          break;
        }
      }
    });
  }, []);

  const onRender = useCallback(() => {
    if (!animator) {
      return;
    }

    const svg = svgRef.current as SVGSVGElement;
    const shapes = Array.from(svg.querySelectorAll('path[data-name="shape"]')) as SVGPathElement[];
    const polylines = Array.from(svg.querySelectorAll('path[data-name="polyline"]')) as SVGPathElement[];

    if (animator.node.state === 'entering' || animator.node.state === 'entered') {
      shapes.concat(polylines).forEach(path => {
        path.style.opacity = '1';
        path.style.strokeDasharray = '';
        path.style.strokeDashoffset = '';
      });
    }
    else {
      shapes.concat(polylines).forEach(path => {
        path.style.opacity = '0';
        path.style.strokeDasharray = '';
        path.style.strokeDashoffset = '';
      });
    }
  }, []);

  return (
    <div css={{
      position: 'relative',
      width: '100%',
      height: 150,

      '& path[data-name="shape"]': {
        color: 'hsl(180, 75%, 10%)'
      },
      '& path[data-name="polyline"]': {
        color: 'hsl(180, 75%, 50%)'
      }
    }}>
      <FrameSVGHexagon
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
