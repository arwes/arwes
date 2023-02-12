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
      polylines={[
        {
          name: 'shape',
          style: {
            strokeWidth: 0,
            fill: 'currentColor'
          },
          polyline: [
            [0, 0],
            [0, '100%'],
            [`100% - ${ss}`, '100%'],
            ['100%', `100% - ${ss}`],
            ['100%', 0]
          ]
        },
        {
          name: 'polyline',
          style: {
            stroke: 'currentColor',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: sw,
            fill: 'transparent'
          },
          polyline: [
            [so, `100% - ${so}`],
            [`100% - ${ss}`, `100% - ${so}`],
            [`100% - ${so}`, `100% - ${ss - so}`]
          ]
        }
      ]}
    />
  );
};

export type { FrameSVGUnderlineProps };
export { FrameSVGUnderline };
