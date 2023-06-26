import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import { type FrameSVGPathGeneric } from '@arwes/frames';

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

  const paths = useMemo(() => {
    const so = sw / 2;

    return [
      {
        name: 'bg',
        style: {
          strokeWidth: 0,
          fill: 'currentcolor'
        },
        path: [
          ['M', 0, 0],
          ['L', 0, '100%'],
          ['L', `100% - ${ss}`, '100%'],
          ['L', '100%', `100% - ${ss}`],
          ['L', '100%', 0]
        ]
      },
      {
        name: 'line',
        style: {
          stroke: 'currentcolor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: String(sw),
          fill: 'none'
        },
        path: [
          ['M', so, `100% - ${so}`],
          ['L', `100% - ${ss}`, `100% - ${so}`],
          ['L', `100% - ${so}`, `100% - ${ss - so}`]
        ]
      }
    ] as FrameSVGPathGeneric[];
  }, [ss, sw, inverted]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgunderline', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGUnderlineProps };
export { FrameSVGUnderline };
