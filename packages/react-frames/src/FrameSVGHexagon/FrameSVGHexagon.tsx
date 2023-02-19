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
  strokeWidth?: number
  className?: string
}

const FrameSVGHexagon = (props: FrameSVGHexagonProps): ReactElement => {
  const {
    squareSize: ss = 16,
    inverted,
    strokeWidth = 1,
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

    // Polylines without repeated points between them.
    let polyline1: FRAME_SVG_PATH = [];
    let polyline2: FRAME_SVG_PATH = [];

    if (!inverted) {
      polyline1 = [
        ['M', so, `100% - ${so}`],
        ['L', `100% - ${ss - so}`, `100% - ${so}`],
        ['L', `100% - ${so}`, `100% - ${ss - so}`],
        ['L', `100% - ${so}`, so]
      ];
      polyline2 = [
        ['M', `100% - ${so}`, so],
        ['L', ss + so, so],
        ['L', so, ss - so],
        ['L', so, `100% - ${so}`]
      ];
    }
    else {
      polyline1 = [
        ['M', so, so],
        ['L', so, `100% - ${ss}`],
        ['L', ss + so, `100% - ${so}`],
        ['L', `100% - ${so}`, `100% - ${so}`]
      ];
      polyline2 = [
        ['M', `100% - ${so}`, `100% - ${so}`],
        ['L', `100% - ${so}`, ss - so],
        ['L', `100% - ${ss - so}`, so],
        ['L', so, so]
      ];
    }

    return [
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
    ] as FRAME_SVG_PATH_GENERIC[];
  }, [ss, inverted, strokeWidth]);

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
