import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FrameSVGPath,
  type FrameSVGStyle,
  type FrameSVGPathGeneric
} from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGOctagonProps extends FrameSVGProps {
  leftTop?: boolean
  rightTop?: boolean
  rightBottom?: boolean
  leftBottom?: boolean
  squareSize?: number
  padding?: number
  strokeWidth?: number
  className?: string
}

type Point = [number | string, number | string];

const toPath = (points: Point[]): FrameSVGPath =>
  points.map((p, i) => [i === 0 ? 'M' : 'L', ...p]);

const FrameSVGOctagon = (props: FrameSVGOctagonProps): ReactElement => {
  const {
    leftTop = true,
    rightTop = true,
    rightBottom = true,
    leftBottom = true,
    squareSize: ss = 16,
    strokeWidth = 1,
    padding: p = 0,
    className,
    ...otherProps
  } = props;

  const paths = useMemo(() => {
    const so = strokeWidth / 2;

    const polylineStyle: FrameSVGStyle = {
      stroke: 'currentcolor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: String(strokeWidth),
      fill: 'none'
    };

    const leftTopPoints: Point[] = leftTop
      ? [
          [ss + so + p, so + p],
          [so + p, ss + so + p]
        ]
      : [
          [so + p, so + p]
        ];

    const leftBottomPoints: Point[] = leftBottom
      ? [
          [so + p, `100% - ${ss + p}`],
          [ss + so + p, `100% - ${so + p}`]
        ]
      : [
          [so + p, `100% - ${so + p}`]
        ];

    const rightBottomPoints: Point[] = rightBottom
      ? [
          [`100% - ${ss + so + p}`, `100% - ${so + p}`],
          [`100% - ${so + p}`, `100% - ${ss + so + p}`]
        ]
      : [
          [`100% - ${so + p}`, `100% - ${so + p}`]
        ];

    const rightTopPoints: Point[] = rightTop
      ? [
          [`100% - ${so + p}`, ss - so + p],
          [`100% - ${ss - so + p}`, so + p]
        ]
      : [
          [`100% - ${so + p}`, so + p]
        ];

    // leftTop > leftBottom > rightBottom
    const polyline1 = toPath([
      ...leftTopPoints,
      ...leftBottomPoints,
      rightBottomPoints[0]
    ]);

    // rightBottom > rightTop > leftTop
    const polyline2 = toPath([
      ...rightBottomPoints,
      ...rightTopPoints,
      leftTopPoints[0]
    ]);

    const paths: FrameSVGPathGeneric[] = [
      {
        name: 'bg',
        style: {
          strokeWidth: 0,
          fill: 'currentcolor'
        },
        path: polyline1.concat(polyline2)
      },
      {
        name: 'line',
        style: polylineStyle,
        path: polyline1
      },
      {
        name: 'line',
        style: polylineStyle,
        path: polyline2
      }
    ];

    return paths;
  }, [leftTop, rightTop, rightBottom, leftBottom, ss, strokeWidth, p]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgoctagon', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGOctagonProps };
export { FrameSVGOctagon };
