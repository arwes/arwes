import React, { type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import { type FRAME_SVG_POLYLINE } from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGPentagonProps extends FrameSVGProps {
  squareSize?: number
  inverted?: boolean
  className?: string
}

const FrameSVGPentagon = (props: FrameSVGPentagonProps): ReactElement => {
  const {
    squareSize: ss = 16,
    inverted,
    className,
    ...otherProps
  } = props;

  let polyline1: FRAME_SVG_POLYLINE = [];
  let polyline2: FRAME_SVG_POLYLINE = [];

  if (!inverted) {
    polyline1 = [
      [0, '100%'],
      [`100% - ${ss}`, '100%'],
      ['100%', `100% - ${ss}`],
      ['100%', 0]
    ];
    polyline2 = [
      [0, 0]
    ];
  }
  else {
    polyline1 = [
      [0, 0],
      [0, `100% - ${ss}`],
      [ss, '100%'],
      ['100%', '100%']
    ];
    polyline2 = [
      ['100%', 0]
    ];
  }

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgpentagon', className)}
      shapes={[
        polyline1.concat(polyline2)
      ]}
      polylines={[
        polyline1,
        // Polyline2 joins with ending vertexes of Polyline1.
        [
          polyline1[polyline1.length - 1],
          ...polyline2,
          polyline1[0]
        ]
      ]}
    />
  );
};

export type { FrameSVGPentagonProps };
export { FrameSVGPentagon };
