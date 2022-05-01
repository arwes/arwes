import React, { ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx, mergeRefs } from '@arwes/tools';

import { DotsPropsOrigin, DotsProps } from './Dots.types';

const getDistanceBetweenTwoPoints = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

const getDistanceFromOriginProgress = (
  width: number,
  height: number,
  x1: number,
  y1: number,
  origin: DotsPropsOrigin
): number => {
  switch (origin) {
    case 'left': return x1 / width;
    case 'right': return 1 - x1 / width;
    case 'top': return y1 / height;
    case 'bottom': return 1 - y1 / height;
    case 'center': origin = [0.5, 0.5]; break;
  }

  const [x2Progress, y2Progress] = origin;
  const x2 = width * x2Progress;
  const y2 = height * y2Progress;
  const distanceFromOrigin = getDistanceBetweenTwoPoints(x1, y1, x2, y2);
  const containerLength = getDistanceBetweenTwoPoints(0, 0, width, height);

  return distanceFromOrigin / containerLength;
};

const getAlpha = (
  width: number,
  height: number,
  x: number,
  y: number,
  origin: DotsPropsOrigin,
  progress: number
): number => {
  const distanceFromOriginProgress = getDistanceFromOriginProgress(width, height, x, y, origin);

  const alphaProgress = progress / distanceFromOriginProgress;

  return Math.max(0, Math.min(1, alphaProgress));
};

const defaultProps: Required<Pick<DotsProps, 'type' | 'duration' | 'distance' | 'size' | 'origin'>> = {
  type: 'box',
  duration: 2,
  distance: 30,
  size: 2,
  origin: 'center'
};

const DotsComponent = (props: DotsProps): ReactElement => {
  const {
    elementRef: elementRefExternal,
    className,
    style,
    color,
    type,
    duration,
    distance,
    size,
    origin
  } = { ...defaultProps, ...props };

  const elementRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = elementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const xLength = 1 + Math.floor(width / distance);
    const yLength = 1 + Math.floor(height / distance);

    const xMargin = width % distance;
    const yMargin = height % distance;

    const runFrame = (progress: number): void => {
      ctx.clearRect(0, 0, width, height);

      for (let xIndex = 0; xIndex < xLength; xIndex++) {
        const x = (xMargin / 2) + (xIndex * distance);

        for (let yIndex = 0; yIndex < yLength; yIndex++) {
          const y = (yMargin / 2) + (yIndex * distance);

          ctx.beginPath();
          ctx.globalAlpha = getAlpha(width, height, x, y, origin, progress);
          if (type === 'box') {
            ctx.rect(x - (size / 2), y - (size / 2), size, size);
          }
          else {
            ctx.arc(x, y, size, 0, 2 * Math.PI);
          }
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        }
      }
    };

    const animationControl = animate(runFrame, { duration, easing: 'linear' });

    return () => {
      animationControl?.cancel();
    };
  }, []);

  return (
    <canvas
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-patterns-dots', className)}
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

DotsComponent.defaultProps = defaultProps;

export type { DotsProps };
export { DotsComponent };
