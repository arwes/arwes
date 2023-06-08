import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FrameSVGPath,
  type FrameSVGStyle,
  type FrameSVGPathGeneric
} from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGKranoxProps extends FrameSVGProps {
  squareSize?: number
  padding?: number
  strokeWidth?: number
  smallLineLength?: number
  largeLineLength?: number
  className?: string
}

type Point = [number | string, number | string];

const toPath = (points: Point[]): FrameSVGPath =>
  points.map((p, i) => [i === 0 ? 'M' : 'L', ...p]);

const FrameSVGKranox = (props: FrameSVGKranoxProps): ReactElement => {
  const {
    squareSize: ss = 16,
    strokeWidth = 1,
    smallLineLength: sll = 16,
    largeLineLength: lll = 64,
    padding: p = 0,
    className,
    ...otherProps
  } = props;

  const paths = useMemo(() => {
    const so = strokeWidth / 2; // Stroke offset.

    const polylineStyle: FrameSVGStyle = {
      stroke: 'currentcolor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: String(strokeWidth),
      fill: 'none'
    };

    // Left-bottom > left-top > right-top.
    const leftTopLine: Point[] = [
      // Left-bottom.
      [so + p + ss * 2, `100% - ${so + p}`],
      [so + p + ss, `100% - ${so + p + ss}`],
      // Left.
      [so + p + ss, so + p + lll + ss * 3 + sll],
      [so + p, so + p + lll + ss * 2 + sll],
      [so + p, so + p + ss * 2 + sll],
      [so + p + ss, so + p + sll + ss],
      // Left-top.
      [so + p + ss, so + p + ss],
      [so + p + ss * 2, so + p],
      // Right-top.
      [`100% - ${so + p + ss * 2}`, so + p]
    ];

    // Right-top > Right-bottom > Left-bottom.
    const rightBottomLine: Point[] = [
      // Right-top.
      [`100% - ${so + p + ss * 2}`, so + p],
      [`100% - ${so + p + ss}`, so + p + ss],
      // Right.
      [`100% - ${so + p + ss}`, `100% - ${so + p + ss * 3 + sll + lll}`],
      [`100% - ${so + p}`, `100% - ${so + p + ss * 2 + sll + lll}`],
      [`100% - ${so + p}`, `100% - ${so + p + ss * 2 + sll}`],
      [`100% - ${so + p + ss}`, `100% - ${so + p + ss + sll}`],
      // Right-bottom.
      [`100% - ${so + p + ss}`, `100% - ${so + p + ss}`],
      [`100% - ${so + p + ss * 2}`, `100% - ${so + p}`],
      // Left-bottom.
      [so + p + ss * 2, `100% - ${so + p}`]
    ];

    const paths: FrameSVGPathGeneric[] = [
      {
        name: 'bg',
        style: {
          strokeWidth: 0,
          fill: 'currentcolor'
        },
        path: toPath(leftTopLine.concat(rightBottomLine))
      },
      {
        name: 'line',
        style: polylineStyle,
        path: toPath(leftTopLine)
      },
      {
        name: 'line',
        style: polylineStyle,
        path: toPath(rightBottomLine)
      }
    ];

    return paths;
  }, [sll, lll, ss, strokeWidth, p]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgkranox', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGKranoxProps };
export { FrameSVGKranox };
