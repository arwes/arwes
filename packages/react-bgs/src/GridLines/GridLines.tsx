import React, { type ReactElement, useRef, useEffect } from 'react';
import { animate } from 'motion';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { ANIMATOR_STATES, type AnimatorNode } from '@arwes/animator';
import { useAnimator } from '@arwes/react-animator';

import { type GridLinesProps } from './GridLines.types';

const { entering, exiting } = ANIMATOR_STATES;

const defaultProps: Required<Pick<GridLinesProps, 'lineWidth' | 'lineColor' | 'horizontalLineDash' | 'verticalLineDash' | 'distance'>> = {
  lineWidth: 1,
  lineColor: '#777',
  horizontalLineDash: [4],
  verticalLineDash: [],
  distance: 30
};

const GridLines = (props: GridLinesProps): ReactElement => {
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
    let resizeObserver: ResizeObserver | undefined;

    const draw = (): void => {
      const {
        lineWidth,
        lineColor,
        horizontalLineDash,
        verticalLineDash,
        distance
      } = propsFullRef.current;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const xLength = 1 + Math.floor(width / distance);
      const yLength = 1 + Math.floor(height / distance);

      const xMargin = width % distance;
      const yMargin = height % distance;

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;

      // Horizontal lines.

      ctx.setLineDash(horizontalLineDash);

      for (let yIndex = 0; yIndex < yLength; yIndex++) {
        const y = (yMargin / 2) + (yIndex * distance);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.closePath();
      }

      // Vertical lines.

      ctx.setLineDash(verticalLineDash);

      for (let xIndex = 0; xIndex < xLength; xIndex++) {
        const x = (xMargin / 2) + (xIndex * distance);

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.closePath();
      }
    };

    const animatorSubscription = (node: AnimatorNode): void => {
      const state = node.state;
      const { duration } = node.control.getSettings();

      switch (state) {
        case entering: {
          draw();
          transitionControl = animate(
            canvas,
            { opacity: [0, 1] },
            { duration: duration?.enter, easing: 'ease-out' }
          );
          break;
        }
        case exiting: {
          transitionControl = animate(
            canvas,
            { opacity: [1, 0] },
            { duration: duration?.exit, easing: 'ease-out' }
          );
          break;
        }
      }
    };

    animator.node.subscribers.add(animatorSubscription);

    if (window.ResizeObserver && !resizeObserver) {
      resizeObserver = new window.ResizeObserver(() => draw());
      resizeObserver.observe(canvas);
    }

    return () => {
      animator.node.subscribers.delete(animatorSubscription);
      transitionControl?.cancel();
      resizeObserver?.disconnect();
    };
  }, [animator]);

  return (
    <canvas
      role='presentation'
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-react-bgs-gridlines', className)}
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

export { GridLines };
