import React, { type ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx, randomizeList } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { easing } from '@arwes/animated';
import { ANIMATOR_STATES, type AnimatorNode } from '@arwes/animator';
import { useAnimator } from '@arwes/react-animator';

import { type MovingLinesProps, type MovingLinesLineConfig, type MovingLinesLine } from './MovingLines.types';

const { entering, exiting, exited } = ANIMATOR_STATES;

const random = (min: number, max: number): number => (max - min) * Math.random();
const minmaxOverflow01 = (value: number): number => Math.min(1, Math.max(0, value === 1 ? 1 : value % 1));

// Create a list of lines in the given available canvas axis size.
// The lines are placed at random positions in the grid.
const createLinesSet = (config: MovingLinesLineConfig): MovingLinesLine[] => {
  const { distance, positionsLength, margin, size } = config;

  const linesLength = Math.floor(random(0.1, 0.5) * positionsLength);
  const positions = Array(positionsLength).fill(0).map((_, i) => i);
  const positionsRandom = randomizeList(positions);
  const positionsSelected = positionsRandom.slice(0, linesLength);

  return positionsSelected.map(position => {
    const axis1 = (margin / 2) + (position * distance);
    const axis2Initial = Math.random() * (size / 2);
    const length = Math.floor(random(0.1, 0.5) * size);
    return { axis1, axis2Initial, length };
  });
};

const defaultProps: Required<Pick<MovingLinesProps, 'lineColor' | 'lineWidth' | 'distance' | 'sets'>> = {
  lineWidth: 1,
  lineColor: '#777',
  distance: 30,
  sets: 5
};

const MovingLines = (props: MovingLinesProps): ReactElement => {
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

    let transitionControl: ReturnType<typeof animate> | undefined;
    let intervalControl: ReturnType<typeof animate> | undefined;
    let linesSets: MovingLinesLine[][] = [];

    const draw = (intervalProgress: number): void => {
      const {
        lineWidth,
        lineColor,
        distance,
        sets: linesSetsLength
      } = propsFullRef.current;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const isResized = canvas.width !== width || canvas.height !== height;

      const axis1Size = width;
      const axis2Size = height;
      const positionsLength = 1 + Math.floor(axis1Size / distance);
      const margin = axis1Size % distance;

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.shadowBlur = lineWidth;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = lineColor;

      if (linesSets.length === 0 || isResized) {
        linesSets = Array(linesSetsLength).fill(null).map(() =>
          createLinesSet({ positionsLength, margin, distance, size: axis2Size })
        );
      }

      linesSets.forEach((linesSet, linesSetIndex) => {
        // "intervalProgress" goes from 0 to 1 repeatedly indicating each interval.
        // Every set of lines will have an progress offset so the its animation
        // starts/ends at different times than each other.
        // Since those sets will start later in time, they will end faster, so
        // when they do, they extra progress offset will start from the beginning.
        // So if one set ends at 1.23 in the animation progress, it overflows
        // and becomes 0.23.
        const linesSetProgressOffset = ((1 / linesSetsLength) * linesSetIndex);
        const progress = minmaxOverflow01(intervalProgress + linesSetProgressOffset);
        const progressEase = easing.inOutCubic(progress);

        linesSet.forEach(line => {
          const { axis1, axis2Initial, length } = line;

          // Move the line from before to after the visible space.
          const axis2Move = ((axis2Size * 2) * progressEase) - axis2Size;

          ctx.beginPath();
          ctx.moveTo(axis1, axis2Size - (axis2Initial + axis2Move));
          ctx.lineTo(axis1, axis2Size - (axis2Initial + length + axis2Move));
          ctx.stroke();
          ctx.closePath();
        });
      });
    };

    const animatorSubscription = (node: AnimatorNode): void => {
      const state = node.state;
      const { duration } = node.control.getSettings();

      switch (state) {
        case entering: {
          transitionControl = animate(
            canvas,
            { opacity: [0, 1] },
            { duration: duration.enter, easing: 'ease-out' }
          );
          intervalControl = animate(
            draw,
            { duration: duration.interval || 10, easing: 'linear', repeat: Infinity }
          );
          break;
        }
        case exiting: {
          transitionControl = animate(
            canvas,
            { opacity: [1, 0] },
            { duration: duration.exit, easing: 'ease-out' }
          );
          break;
        }
        case exited: {
          intervalControl?.cancel();
          break;
        }
      }
    };

    animator.node.subscribers.add(animatorSubscription);

    return () => {
      animator.node.subscribers.delete(animatorSubscription);
      transitionControl?.cancel();
      intervalControl?.cancel();
    };
  }, [animator]);

  return (
    <canvas
      role='presentation'
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-react-bgs-movinglines', className)}
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
        opacity: 0,
        ...style
      }}
    />
  );
};

export { MovingLines };
