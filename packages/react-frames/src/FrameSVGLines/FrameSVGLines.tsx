import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FrameSVGPathGeneric,
  type FrameSVGPath,
  type FrameSVGStyle
} from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGLinesProps extends FrameSVGProps {
  largeLineWidth?: number
  smallLineWidth?: number
  smallLineLength?: number
  className?: string
}

const FrameSVGLines = (props: FrameSVGLinesProps): ReactElement => {
  const {
    largeLineWidth: llw = 1,
    smallLineWidth: slw = 1,
    smallLineLength: sll = 16,
    className,
    ...otherProps
  } = props;

  const paths: FrameSVGPathGeneric[] = useMemo(() => {
    const polylineStyle: FrameSVGStyle = {
      strokeLinecap: 'square',
      stroke: 'currentcolor',
      fill: 'none'
    };

    const llo = llw / 2;
    const slo = slw / 2;

    const largePolylines: FrameSVGPath[] = [
      // Top
      [
        ['M', llo, llo],
        ['L', '50% + 0.1', llo]
      ],
      [
        ['M', `100% - ${llo}`, llo],
        ['L', '50% - 0.1', llo]
      ],

      // Bottom
      [
        ['M', llo, `100% - ${llo}`],
        ['L', '50% + 0.1', `100% - ${llo}`]
      ],
      [
        ['M', `100% - ${llo}`, `100% - ${llo}`],
        ['L', '50% - 0.1', `100% - ${llo}`]
      ]
    ];

    const smallPolylines: FrameSVGPath[] = [
      // Top
      [
        ['M', slo, llw + slo],
        ['L', sll + slo, llw + slo]
      ],
      [
        ['M', `100% - ${slo}`, llw + slo],
        ['L', `100% - ${sll + slo}`, llw + slo]
      ],

      // Bottom
      [
        ['M', slo, `100% - ${llw + slo}`],
        ['L', sll + slo, `100% - ${llw + slo}`]
      ],
      [
        ['M', `100% - ${slo}`, `100% - ${llw + slo}`],
        ['L', `100% - ${sll + slo}`, `100% - ${llw + slo}`]
      ]
    ];

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
          ['L', '100%', '100%'],
          ['L', '100%', 0]
        ]
      },
      ...largePolylines.map(polyline => ({
        name: 'line',
        style: {
          ...polylineStyle,
          strokeWidth: String(llw)
        },
        path: polyline
      })),
      ...smallPolylines.map(polyline => ({
        name: 'line',
        style: {
          ...polylineStyle,
          strokeWidth: String(slw)
        },
        path: polyline
      }))
    ];
  }, [llw, slw, sll]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvglines', className)}
      paths={paths}
    />
  );
};

export type { FrameSVGLinesProps };
export { FrameSVGLines };
