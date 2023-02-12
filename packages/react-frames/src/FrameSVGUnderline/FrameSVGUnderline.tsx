import React, { type ReactElement } from 'react';
import { cx } from '@arwes/tools';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGUnderlineProps extends FrameSVGProps {
  squareSize?: number
  strokeWidth?: number
  inverted?: boolean
  className?: string
}

const FrameSVGUnderline = (props: FrameSVGUnderlineProps): ReactElement => {
  const {
    squareSize: ss = 16,
    strokeWidth: sw = 1,
    inverted,
    className,
    ...otherProps
  } = props;

  const so = sw / 2;

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgunderline', className)}
      shapes={[
        [
          [0, 0],
          [0, '100%'],
          [`100% - ${ss}`, '100%'],
          ['100%', `100% - ${ss}`],
          ['100%', 0]
        ]
      ]}
      polylines={[
        {
          polyline: [
            [so, `100% - ${so}`],
            [`100% - ${ss}`, `100% - ${so}`],
            [`100% - ${so}`, `100% - ${ss - so}`]
          ],
          style: {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: sw
          }
        }
      ]}
    />
  );
};

export type { FrameSVGUnderlineProps };
export { FrameSVGUnderline };
