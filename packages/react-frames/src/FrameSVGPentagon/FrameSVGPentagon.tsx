import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FrameSVGPathGeneric,
  type FrameSVGPath,
  type FrameSVGStyle
} from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGPentagonProps extends FrameSVGProps {
  squareSize?: number
  inverted?: boolean
  strokeWidth?: number
  className?: string
}

const FrameSVGPentagon = (props: FrameSVGPentagonProps): ReactElement => {
  const {
    squareSize: ss = 16,
    inverted,
    strokeWidth = 1,
    className,
    ...otherProps
  } = props;

  const paths: FrameSVGPathGeneric[] = useMemo(() => {
    const so = strokeWidth / 2;

    const polylineStyle: FrameSVGStyle = {
      stroke: 'currentcolor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: String(strokeWidth),
      fill: 'none'
    };

    let polyline1: FrameSVGPath = [];
    let polyline2: FrameSVGPath = [];

    if (!inverted) {
      polyline1 = [
        ['M', so, `100% - ${so}`],
        ['L', `100% - ${ss + so}`, `100% - ${so}`],
        ['L', `100% - ${so}`, `100% - ${ss}`],
        ['L', `100% - ${so}`, so]
      ];
      polyline2 = [
        ['M', `100% - ${so}`, so],
        ['L', so, so],
        ['L', so, `100% - ${so}`]
      ];
    }
    else {
      polyline1 = [
        ['M', so, so],
        ['L', so, `100% - ${ss - so}`],
        ['L', ss + so, `100% - ${so}`],
        ['L', `100% - ${so}`, `100% - ${so}`]
      ];
      polyline2 = [
        ['M', `100% - ${so}`, `100% - ${so}`],
        ['L', `100% - ${so}`, so],
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
    ];
  }, [ss, inverted, strokeWidth]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgpentagon', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGPentagonProps };
export { FrameSVGPentagon };
