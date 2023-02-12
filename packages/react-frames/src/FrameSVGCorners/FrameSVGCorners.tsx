import React, { type ReactElement } from 'react';
import { cx } from '@arwes/tools';

import { type FRAME_SVG_POLYLINE_GENERIC, type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGCornersProps extends FrameSVGProps {
  strokeWidth?: number
  cornerLength?: number
  className?: string
}

const FrameSVGCorners = (props: FrameSVGCornersProps): ReactElement => {
  const {
    strokeWidth: cw = 1,
    cornerLength: cl = 16,
    className,
    ...otherProps
  } = props;

  const co = cw / 2;

  const polylines: FRAME_SVG_POLYLINE_GENERIC[] = [
    // Left-top.
    [[co, co], [co, cl]],
    [[co, co], [cl, co]],

    // Right top.
    [[`100% - ${co}`, co], [`100% - ${cl}`, co]],
    [[`100% - ${co}`, co], [`100% - ${co}`, cl]],

    // Right bottom.
    [[`100% - ${co}`, `100% - ${co}`], [`100% - ${cl}`, `100% - ${co}`]],
    [[`100% - ${co}`, `100% - ${co}`], [`100% - ${co}`, `100% - ${cl}`]],

    // Left bottom.
    [[co, `100% - ${co}`], [co, `100% - ${cl}`]],
    [[co, `100% - ${co}`], [cl, `100% - ${co}`]]
  ].map(polyline => ({
    name: 'polyline',
    style: {
      stroke: 'currentColor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: cw,
      fill: 'transparent'
    },
    polyline
  }));

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgcorners', className)}
      polylines={[
        {
          name: 'shape',
          style: {
            strokeWidth: 0,
            fill: 'currentcolor'
          },
          polyline: [
            [cw, cw],
            [cw, `100% - ${cw}`],
            [`100% - ${cw}`, `100% - ${cw}`],
            [`100% - ${cw}`, cw]
          ]
        },
        ...polylines
      ]}
    />
  );
};

export type { FrameSVGCornersProps };
export { FrameSVGCorners };
