import React, { type ReactElement } from 'react';
import { cx } from '@arwes/tools';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGCornersProps extends FrameSVGProps {
  cornerWidth?: number
  cornerLength?: number
  contentLineWidth?: number
  className?: string
}

const FrameSVGCorners = (props: FrameSVGCornersProps): ReactElement => {
  const {
    cornerWidth: cw = 1,
    cornerLength: cl = 16,
    className,
    ...otherProps
  } = props;

  const co = cw / 2;

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgcorners', className)}
      shapes={[
        [
          [cw, cw],
          [cw, `100% - ${cw}`],
          [`100% - ${cw}`, `100% - ${cw}`],
          [`100% - ${cw}`, cw]
        ]
      ]}
      polylines={[
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
        polyline,
        style: {
          strokeWidth: cw,
          strokeLinecap: 'square'
        }
      }))}
    />
  );
};

export type { FrameSVGCornersProps };
export { FrameSVGCorners };
