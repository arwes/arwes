import React, { type ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { easing } from '@arwes/animated';
import { ANIMATOR_STATES, type AnimatorNode } from '@arwes/animator';
import { useAnimator } from '@arwes/react-animator';

import { type PuffsProps } from './Puffs.types';

type AnimateControl = ReturnType<typeof animate>;

interface Puff {
  x: number
  y: number
  r: number
  xo: number
  yo: number
  ro: number
}

const { entering, entered, exiting, exited } = ANIMATOR_STATES;

const minmaxOverflow01 = (value: number): number => Math.min(1, Math.max(0, value === 1 ? 1 : value % 1));

const defaultProps: Required<Pick<
PuffsProps, 'padding' | 'xOffset' | 'yOffset' | 'radiusInitial' | 'radiusOffset' | 'sets'
>> = {
  padding: 50,
  xOffset: [0, 0],
  yOffset: [-10, -100],
  radiusInitial: 4,
  radiusOffset: [4, 40],
  sets: 5
};

const Puffs = (props: PuffsProps): ReactElement => {
  const propsFull = { ...defaultProps, ...props };
  const {
    elementRef: elementRefExternal,
    className,
    style
  } = propsFull;

  const animator = useAnimator();
  const elementRef = useRef<HTMLCanvasElement>(null);
  const propsFullRef = useRef(propsFull);

  propsFullRef.current = propsFull;

  useEffect(() => {
    if (!animator) {
      return;
    }

    const canvas = elementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let canvasControl: AnimateControl | undefined;
    let puffsControl: AnimateControl | undefined;
    let puffsEmptyTimeoutId: number | undefined;

    const cancelAnimationSubscriptions = (): void => {
      canvasControl?.cancel();
      puffsControl?.cancel();
      window.clearTimeout(puffsEmptyTimeoutId);
    };

    const animatorSubscription = (node: AnimatorNode): void => {
      const state = node.state;
      const { duration } = node.control.getSettings();

      switch (state) {
        case entering: {
          cancelAnimationSubscriptions();

          const {
            color,
            quantity,
            padding,
            xOffset,
            yOffset,
            radiusInitial,
            radiusOffset,
            sets
          } = propsFullRef.current;

          const puffsSetQuantity = Math.round(quantity / sets);
          const puffsSetOffset = 1 / sets;

          const createPuff = (width: number, height: number): Puff => {
            const x = padding + (Math.random() * (width - (padding * 2)));
            const y = padding + (Math.random() * (height - (padding * 2)));
            const r = radiusInitial;

            const xo = xOffset[0] + (Math.random() * xOffset[1]);
            const yo = yOffset[0] + (Math.random() * yOffset[1]);
            const ro = radiusOffset[0] + (Math.random() * radiusOffset[1]);

            return { x, y, r, xo, yo, ro };
          };

          const createPuffsSets = (width: number, height: number): Puff[][] => {
            return Array(sets)
              .fill(null)
              .map(() =>
                Array(puffsSetQuantity)
                  .fill(null)
                  .map(() => createPuff(width, height))
              );
          };

          const drawPuffs = (puffs: Puff[], progress: number): void => {
            // From: 0 at 0%, 1 at 50%, 0 at 100%.
            ctx.globalAlpha = progress <= 0.5
              ? progress * 2
              : -2 * progress + 2;

            puffs.forEach(puff => {
              const x = puff.x + (progress * puff.xo);
              const y = puff.y + (progress * puff.yo);
              const r = puff.r + (progress * puff.ro);

              const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
              grd.addColorStop(0, color);
              grd.addColorStop(1, 'transparent');

              ctx.beginPath();
              ctx.fillStyle = grd;
              ctx.arc(x, y, r, 0, 2 * Math.PI);
              ctx.fill();
              ctx.closePath();
            });
          };

          let puffsSets: Puff[][] = [];

          const draw = (intervalProgress: number): void => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const isResized = canvas.width !== width || canvas.height !== height;

            if (isResized || !puffsSets.length) {
              puffsSets = createPuffsSets(width, height);
            }

            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, width, height);

            puffsSets.forEach((puffs, index) => {
              const puffsOffset = puffsSetOffset * index;
              const puffsProgress = minmaxOverflow01(intervalProgress + puffsOffset);
              drawPuffs(puffs, easing.outSine(puffsProgress));
            });
          };

          canvasControl = animate(
            canvas,
            { opacity: [0, 1] },
            { duration: duration?.enter }
          );

          const runPuffsAnimation = (): void => {
            puffsControl = animate(
              (progress: number): void => {
                draw(progress);
                if (progress >= 1) {
                  const emptyDuration = (duration?.intervalPause || 0) * 1000;
                  window.clearTimeout(puffsEmptyTimeoutId);
                  window.setTimeout(runPuffsAnimation, emptyDuration);
                }
              },
              { duration: duration?.interval, easing: 'linear' }
            );
          };

          runPuffsAnimation();

          break;
        }

        case entered: {
          break;
        }

        case exiting: {
          canvasControl?.cancel();
          canvasControl = animate(
            canvas,
            { opacity: [1, 0] },
            { duration: duration?.exit }
          );
          break;
        }

        case exited: {
          cancelAnimationSubscriptions();
          canvas.style.opacity = '0';
          break;
        }
      }
    };

    animator.node.subscribers.add(animatorSubscription);

    return () => {
      animator.node.subscribers.delete(animatorSubscription);
      cancelAnimationSubscriptions();
    };
  }, [animator]);

  return (
    <canvas
      role='presentation'
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-react-bgs-puffs', className)}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'block',
        border: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  );
};

export { Puffs };
