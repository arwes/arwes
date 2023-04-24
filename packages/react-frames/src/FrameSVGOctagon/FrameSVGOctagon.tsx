import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FrameSVGPath,
  type FrameSVGStyle,
  type FrameSVGPathGeneric
} from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGOctagonProps extends FrameSVGProps {
  squareSize?: number
  padding?: number
  strokeWidth?: number
  className?: string
}

const FrameSVGOctagon = (props: FrameSVGOctagonProps): ReactElement => {
  const {
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

    const polyline1: FrameSVGPath = [
      ['M', ss + so + p, so + p],
      ['L', so + p, ss + so + p],
      ['L', so + p, `100% - ${ss + p}`],
      ['L', ss + so + p, `100% - ${so + p}`],
      ['L', `100% - ${ss + so + p}`, `100% - ${so + p}`]
    ];

    const polyline2: FrameSVGPath = [
      ['M', `100% - ${ss + so + p}`, `100% - ${so + p}`],
      ['L', `100% - ${so + p}`, `100% - ${ss + so + p}`],
      ['L', `100% - ${so + p}`, ss - so + p],
      ['L', `100% - ${ss - so + p}`, so + p],
      ['L', ss + so + p, so + p]
    ];

    const paths: FrameSVGPathGeneric[] = [
      {
        name: 'shape',
        style: {
          strokeWidth: 0,
          fill: 'currentcolor'
        },
        path: polyline1.concat(polyline2)
      },
      {
        name: 'decoration',
        style: polylineStyle,
        path: polyline1
      },
      {
        name: 'decoration',
        style: polylineStyle,
        path: polyline2
      }
    ];

    return paths;
  }, [ss, strokeWidth, p]);

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
