import React, { ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx, mergeRefs } from '@arwes/tools';
import { ANIMATOR_DEFAULT_KEYS, AnimatorSystemNode, useAnimator } from '@arwes/animator';

import { PuffsProps } from './Puffs.types';

const { ENTERING, EXITING } = ANIMATOR_DEFAULT_KEYS;

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

    let animationControl: { cancel: () => void } | undefined;

    const cancelAnimationSubscriptions = (): void => {
      animationControl?.cancel();
    };

    const animatorSubscription = (node: AnimatorSystemNode): void => {
      const state = node.getState();

      if (state !== ENTERING && state !== EXITING) {
        return;
      }

      cancelAnimationSubscriptions();

      const active = state === ENTERING;
      const { duration } = node.control.getSettings();
      const transitionDuration = (active ? duration?.enter : duration?.exit) || 0;

      const canvas = elementRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

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

      const puffs = Array(quantity).fill(0).map(() => {
        const x = padding + (Math.random() * (width - (padding * 2)));
        const y = padding + (Math.random() * (height - (padding * 2)));
        const r = radiusInitial;

        const xo = xOffset[0] + (Math.random() * xOffset[1]);
        const yo = yOffset[0] + (Math.random() * yOffset[1]);
        const ro = radiusOffset[0] + (Math.random() * radiusOffset[1]);

        return { x, y, r, xo, yo, ro };
      });

      const draw = (progress: number): void => {
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);

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

      animationControl = animate(draw, { duration: transitionDuration });
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
