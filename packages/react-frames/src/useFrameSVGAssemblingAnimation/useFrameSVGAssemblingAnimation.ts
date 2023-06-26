import { type RefObject, useRef, useCallback, useEffect } from 'react';
import { animate, type AnimationControls } from 'motion';
import { ANIMATOR_STATES as STATES } from '@arwes/animator';
import { useAnimator } from '@arwes/react-animator';

interface FrameSVGAssemblingAnimation {
  onRender: () => void
}

const useFrameSVGAssemblingAnimation = (svgRef: RefObject<SVGSVGElement>): FrameSVGAssemblingAnimation => {
  const animator = useAnimator();
  const animationControlRef = useRef<AnimationControls | null>(null);

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) {
      return;
    }

    const bgs = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=bg]'));
    const lines = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=line]'));

    bgs.concat(lines).forEach(path => {
      path.style.opacity = '1';
      path.style.strokeDasharray = '';
      path.style.strokeDashoffset = '';
    });

    if (!animator) {
      return;
    }

    const unsubscribe = animator.node.subscribe(node => {
      const { duration } = node;

      animationControlRef.current?.cancel();

      switch (node.state) {
        case 'exited': {
          bgs.concat(lines).forEach(path => {
            path.style.opacity = '0';
            path.style.strokeDasharray = '';
            path.style.strokeDashoffset = '';
          });
          break;
        }

        case 'entering': {
          for (const polyline of lines) {
            const length = polyline.getTotalLength();
            polyline.style.opacity = '1';
            polyline.style.strokeDasharray = String(length);
            polyline.dataset.length = String(length);
          }

          animationControlRef.current = animate(
            progress => {
              for (const shape of bgs) {
                shape.style.opacity = String(progress);
              }

              for (const polyline of lines) {
                const length = Number(polyline.dataset.length);
                polyline.style.strokeDashoffset = String((1 - progress) * length);
              }
            },
            { duration: duration.enter }
          );
          break;
        }

        case 'entered': {
          bgs.concat(lines).forEach(path => {
            path.style.opacity = '1';
            path.style.strokeDasharray = '';
            path.style.strokeDashoffset = '';
          });
          break;
        }

        case 'exiting': {
          for (const polyline of lines) {
            const length = polyline.getTotalLength();
            polyline.style.strokeDasharray = String(length);
            polyline.dataset.length = String(length);
          }

          animationControlRef.current = animate(
            progress => {
              for (const shape of bgs) {
                shape.style.opacity = String(1 - progress);
              }

              for (const polyline of lines) {
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
  }, [animator]);

  const onRender = useCallback(() => {
    if (!animator || !svgRef.current) {
      return;
    }

    const svg = svgRef.current;
    const bgs = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=bg]'));
    const lines = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=line]'));

    const isVisible = animator.node.state === STATES.entering || animator.node.state === STATES.entered;

    animationControlRef.current?.cancel();

    bgs.concat(lines).forEach(path => {
      path.style.opacity = isVisible ? '1' : '0';
      path.style.strokeDasharray = '';
      path.style.strokeDashoffset = '';
    });
  }, [animator]);

  return { onRender };
};

export type { FrameSVGAssemblingAnimation };
export { useFrameSVGAssemblingAnimation };
