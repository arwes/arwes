import React, { type ReactElement } from 'react';
import { cx } from '@arwes/tools';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGUnderlineProps extends FrameSVGProps {
  squareSize?: number
  inverted?: boolean
  className?: string
}

const FrameSVGUnderline = (props: FrameSVGUnderlineProps): ReactElement => {
  const {
    squareSize: ss = 16,
    inverted,
    className,
    ...otherProps
  } = props;

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
        [
          [0, '100%'],
          [`100% - ${ss}`, '100%'],
          ['100%', `100% - ${ss}`]
        ]
      ]}
    />
  );
};

export type { FrameSVGUnderlineProps };
export { FrameSVGUnderline };
