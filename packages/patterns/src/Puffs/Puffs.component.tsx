// TODO: Handle canvas resizing.
// TODO: Allow only one set of animation per interval.
// TODO: Allow empty space between intervals.

import React, { ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx, mergeRefs } from '@arwes/tools';
import { ANIMATOR_DEFAULT_KEYS, AnimatorSystemNode, useAnimator } from '@arwes/animator';

import { PuffsProps } from './Puffs.types';

interface AnimateControl {
  cancel: () => void
}

interface Puff {
  x: number
  y: number
  r: number
  xo: number
  yo: number
  ro: number
}

const { ENTERING, ENTERED, EXITING, EXITED } = ANIMATOR_DEFAULT_KEYS;

const easeOutSine = (initial: number, change: number, duration: number, time: number): number => {
  return change * Math.sin(time / duration * (Math.PI / 2)) + initial;
};

const mmo01 = (value: number): number => Math.min(1, Math.max(0, value === 1 ? 1 : value % 1));

const defaultProps: Required<Pick<
PuffsProps, 'padding' | 'xOffset' | 'yOffset' | 'radiusInitial' | 'radiusOffset'
>> = {
  padding: 50,
  xOffset: [0, 0],
  yOffset: [-10, -100],
  radiusInitial: 4,
  radiusOffset: [4, 40]
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

    const cancelAnimationSubscriptions = (): void => {
      canvasControl?.cancel();
      puffsControl?.cancel();
    };

    const animatorSubscription = (node: AnimatorSystemNode): void => {
      const state = node.getState();
      const { duration } = node.control.getSettings();

      switch (state) {
        case ENTERING: {
          cancelAnimationSubscriptions();

          const {
            color,
            quantity,
            padding,
            xOffset,
            yOffset,
            radiusInitial,
            radiusOffset
          } = propsFullRef.current;

          const width = canvas.clientWidth;
          const height = canvas.clientHeight;

          const createPuff = (): Puff => {
            const x = padding + (Math.random() * (width - (padding * 2)));
            const y = padding + (Math.random() * (height - (padding * 2)));
            const r = radiusInitial;

            const xo = xOffset[0] + (Math.random() * xOffset[1]);
            const yo = yOffset[0] + (Math.random() * yOffset[1]);
            const ro = radiusOffset[0] + (Math.random() * radiusOffset[1]);

            return { x, y, r, xo, yo, ro };
          };

          const drawPuffs = (puffs: Puff[], progress: number): void => {
            // From: 0 at 0% to 1 at 50% to 0 at 100%.
            ctx.globalAlpha = progress <= 0.5 ? progress * 2 : -2 * progress + 2;

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

          const puffsSetQuantity = Math.round(quantity / 2);
          const puffs1 = Array(puffsSetQuantity).fill(null).map(createPuff);
          const puffs2 = Array(puffsSetQuantity).fill(null).map(createPuff);
          const puffs3 = Array(puffsSetQuantity).fill(null).map(createPuff);
          const puffs4 = Array(puffsSetQuantity).fill(null).map(createPuff);

          const draw = (intervalProgress: number): void => {
            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            drawPuffs(puffs1, easeOutSine(0, 1, 1, mmo01(intervalProgress)));
            drawPuffs(puffs2, easeOutSine(0, 1, 1, mmo01(intervalProgress + 0.25)));
            drawPuffs(puffs3, easeOutSine(0, 1, 1, mmo01(intervalProgress + 0.5)));
            drawPuffs(puffs4, easeOutSine(0, 1, 1, mmo01(intervalProgress + 0.75)));
          };

          canvasControl = animate(
            canvas,
            { opacity: [0, 1] },
            { duration: duration?.enter }
          );

          puffsControl = animate(draw, {
            duration: duration?.interval,
            repeat: Infinity,
            easing: 'linear'
          });

          break;
        }

        case ENTERED: {
          break;
        }

        case EXITING: {
          canvasControl?.cancel();
          canvasControl = animate(
            canvas,
            { opacity: [1, 0] },
            { duration: duration?.exit }
          );
          break;
        }

        case EXITED: {
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
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-patterns-puffs', className)}
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

Puffs.defaultProps = defaultProps;

export type { PuffsProps };
export { Puffs };
