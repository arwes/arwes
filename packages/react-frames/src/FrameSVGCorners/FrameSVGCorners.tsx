import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import { type FrameSVGPathGeneric, type FrameSVGPath } from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

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

  const paths: FrameSVGPathGeneric[] = useMemo(() => {
    const co = cw / 2;

    const bg: FrameSVGPathGeneric = {
      name: 'bg',
      style: {
        strokeWidth: 0,
        fill: 'currentcolor'
      },
      path: [
        ['M', cw, cw],
        ['L', cw, `100% - ${cw}`],
        ['L', `100% - ${cw}`, `100% - ${cw}`],
        ['L', `100% - ${cw}`, cw]
      ]
    };

    const linesPaths: FrameSVGPath[] = [
      // Left top.
      [['M', co, co], ['L', co, cl]],
      [['M', co, co], ['L', cl, co]],

      // Right top.
      [['M', `100% - ${co}`, co], ['L', `100% - ${cl}`, co]],
      [['M', `100% - ${co}`, co], ['L', `100% - ${co}`, cl]],

      // Right bottom.
      [['M', `100% - ${co}`, `100% - ${co}`], ['L', `100% - ${cl}`, `100% - ${co}`]],
      [['M', `100% - ${co}`, `100% - ${co}`], ['L', `100% - ${co}`, `100% - ${cl}`]],

      // Left bottom.
      [['M', co, `100% - ${co}`], ['L', co, `100% - ${cl}`]],
      [['M', co, `100% - ${co}`], ['L', cl, `100% - ${co}`]]
    ];

    const lines: FrameSVGPathGeneric[] = linesPaths.map(path => ({
      name: 'line',
      style: {
        stroke: 'currentcolor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: String(cw),
        fill: 'none'
      },
      path
    }));

    return [bg, ...lines];
  }, [cw, cl]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvgcorners', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGCornersProps };
export { FrameSVGCorners };
