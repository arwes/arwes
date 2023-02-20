import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FRAME_SVG_PATH,
  type FRAME_SVG_STYLE,
  type FRAME_SVG_PATH_GENERIC
} from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGHexagonProps extends FrameSVGProps {
  squareSize?: number
  inverted?: boolean
  padding?: number
  strokeWidth?: number
  className?: string
}

const FrameSVGHexagon = (props: FrameSVGHexagonProps): ReactElement => {
  const {
    squareSize: ss = 16,
    inverted,
    strokeWidth = 1,
    padding: p = 0,
    className,
    ...otherProps
  } = props;

  const paths = useMemo(() => {
    const so = strokeWidth / 2;

    const polylineStyle: FRAME_SVG_STYLE = {
      stroke: 'currentcolor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: String(strokeWidth),
      fill: 'none'
    };

    let polyline1: FRAME_SVG_PATH = [];
    let polyline2: FRAME_SVG_PATH = [];

    if (!inverted) {
      polyline1 = [
        ['M', so + p, `100% - ${so + p}`],
        ['L', `100% - ${ss - so + p}`, `100% - ${so + p}`],
        ['L', `100% - ${so + p}`, `100% - ${ss - so + p}`],
        ['L', `100% - ${so + p}`, so + p]
      ];
      polyline2 = [
        ['M', `100% - ${so + p}`, so + p],
        ['L', ss + so + p, so + p],
        ['L', so + p, ss - so + p],
        ['L', so + p, `100% - ${so + p}`]
      ];
    }
    else {
      polyline1 = [
        ['M', so + p, so + p],
        ['L', so + p, `100% - ${ss + p}`],
        ['L', ss + so + p, `100% - ${so + p}`],
        ['L', `100% - ${so + p}`, `100% - ${so + p}`]
      ];
      polyline2 = [
        ['M', `100% - ${so + p}`, `100% - ${so + p}`],
        ['L', `100% - ${so + p}`, ss - so + p],
        ['L', `100% - ${ss - so + p}`, so + p],
        ['L', so + p, so + p]
      ];
    }

    const paths: FRAME_SVG_PATH_GENERIC[] = [
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
  }, [ss, inverted, strokeWidth, p]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvghexagon', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGHexagonProps };
export { FrameSVGHexagon };
