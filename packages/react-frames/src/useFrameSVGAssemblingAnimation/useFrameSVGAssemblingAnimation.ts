import { type MutableRefObject, useRef, useCallback, useEffect } from 'react';
import { animate, type AnimationControls } from 'motion';
import { useAnimator } from '@arwes/react-animator';

interface UseFrameSVGAssemblingAnimation {
  onRender: () => void
}

const useFrameSVGAssemblingAnimation = (svgRef: MutableRefObject<SVGSVGElement | null>): UseFrameSVGAssemblingAnimation => {
  const animator = useAnimator();
  const animationControlRef = useRef<AnimationControls | null>(null);

  useEffect(() => {
    if (!animator || !svgRef.current) {
      return;
    }

    const svg = svgRef.current;
    const shapes = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-name="shape"]'));
    const polylines = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-name="decoration"]'));

    const unsubscribe = animator.node.subscribe(node => {
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

    return () => {
      animationControlRef.current?.cancel();
      unsubscribe();
    };
  }, []);

  const onRender = useCallback(() => {
    if (!animator || !svgRef.current) {
      return;
    }

    const svg = svgRef.current;
    const shapes = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-name="shape"]'));
    const polylines = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-name="decoration"]'));

    const isVisible = animator.node.state === 'entering' || animator.node.state === 'entered';

    animationControlRef.current?.cancel();

    shapes.concat(polylines).forEach(path => {
      path.style.opacity = isVisible ? '1' : '0';
      path.style.strokeDasharray = '';
      path.style.strokeDashoffset = '';
    });
  }, []);

  return { onRender };
};

export type { UseFrameSVGAssemblingAnimation };
export { useFrameSVGAssemblingAnimation };
