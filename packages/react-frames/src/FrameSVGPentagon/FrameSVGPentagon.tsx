import React, { type CSSProperties, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import { type FRAME_SVG_POLYLINE } from '@arwes/frames';

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

  const so = strokeWidth / 2;

  const polylineStyle: CSSProperties = {
    stroke: 'currentcolor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth,
    fill: 'transparent'
  };

  let polyline1: FRAME_SVG_POLYLINE = [];
  let polyline2: FRAME_SVG_POLYLINE = [];

  if (!inverted) {
    polyline1 = [
      [so, `100% - ${so}`],
      [`100% - ${ss + so}`, `100% - ${so}`],
      [`100% - ${so}`, `100% - ${ss}`],
      [`100% - ${so}`, so]
    ];
    polyline2 = [
      [so, so]
    ];
  }
  else {
    polyline1 = [
      [so, so],
      [so, `100% - ${ss - so}`],
      [ss + so, `100% - ${so}`],
      [`100% - ${so}`, `100% - ${so}`]
    ];
    polyline2 = [
      [`100% - ${so}`, so]
    ];
  }

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgpentagon', className)}
      polylines={[
        {
          name: 'shape',
          style: {
            strokeWidth: 0,
            fill: 'currentcolor'
          },
          polyline: polyline1.concat(polyline2)
        },
        {
          name: 'polyline',
          style: polylineStyle,
          polyline: polyline1
        },
        // Polyline2 joins with ending vertexes of Polyline1.
        {
          name: 'polyline',
          style: polylineStyle,
          polyline: [
            polyline1[polyline1.length - 1],
            ...polyline2,
            polyline1[0]
          ]
        }
      ]}
    />
  );
};

export type { FrameSVGPentagonProps };
export { FrameSVGPentagon };
