import React, { ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx, mergeRefs } from '@arwes/tools';

import { PuffsProps } from './Puffs.types';

const defaultProps: Required<Pick<
PuffsProps,
'interval' | 'duration' | 'padding' | 'xOffset' | 'yOffset' | 'radiusInitial' | 'radiusOffset'
>> = {
  interval: 5,
  duration: 4,
  padding: 50,
  xOffset: [0, 0],
  yOffset: [-10, -100],
  radiusInitial: 4,
  radiusOffset: [4, 40]
};

const PuffsComponent = (props: PuffsProps): ReactElement => {
  const {
    elementRef: elementRefExternal,
    className,
    style,
    color,
    quantity,
    interval,
    duration,
    padding,
    xOffset,
    yOffset,
    radiusInitial,
    radiusOffset
  } = { ...defaultProps, ...props };

  const elementRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = elementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let animationControl: { cancel: () => void } | undefined;
    let timeoutId: number | undefined;

    const render = (): void => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = width;
      canvas.height = height;

      const puffs = Array(quantity).fill(0).map(() => {
        const x = padding + (Math.random() * (width - (padding * 2)));
        const y = padding + (Math.random() * (height - (padding * 2)));
        const r = radiusInitial;

        const xo = xOffset[0] + (Math.random() * xOffset[1]);
        const yo = yOffset[0] + (Math.random() * yOffset[1]);
        const ro = radiusOffset[0] + (Math.random() * radiusOffset[1]);

        return { x, y, r, xo, yo, ro };
      });

      const runFrame = (progress: number): void => {
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

      animationControl = animate(runFrame, { duration });
      timeoutId = window.setTimeout(() => render(), interval * 1000);
    };

    render();

    return () => {
      animationControl?.cancel();
      window.clearTimeout(timeoutId);
    };
  }, [color, quantity]);

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

PuffsComponent.defaultProps = defaultProps;

export type { PuffsProps };
export { PuffsComponent };
