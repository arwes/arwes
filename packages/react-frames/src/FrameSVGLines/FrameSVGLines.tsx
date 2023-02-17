import React, { useMemo, type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import {
  type FRAME_SVG_POLYLINE_GENERIC,
  type FRAME_SVG_POLYLINE,
  type FRAME_SVG_POLYLINE_STYLE
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

  const polylines = useMemo(() => {
    const polylineStyle: FRAME_SVG_POLYLINE_STYLE = {
      strokeLinecap: 'square',
      stroke: 'currentColor',
      fill: 'transparent'
    };

    const llo = llw / 2;
    const slo = slw / 2;

    const largePolylines: FRAME_SVG_POLYLINE[] = [
      // Top
      [[llo, llo], ['50% + 0.1', llo]],
      [[`100% - ${llo}`, llo], ['50% - 0.1', llo]],

      // Bottom
      [[llo, `100% - ${llo}`], ['50% + 0.1', `100% - ${llo}`]],
      [[`100% - ${llo}`, `100% - ${llo}`], ['50% - 0.1', `100% - ${llo}`]]
    ];

    const smallPolylines: FRAME_SVG_POLYLINE[] = [
      // Top
      [[slo, llw + slo], [sll + slo, llw + slo]],
      [[`100% - ${slo}`, llw + slo], [`100% - ${sll + slo}`, llw + slo]],

      // Bottom
      [[slo, `100% - ${llw + slo}`], [sll + slo, `100% - ${llw + slo}`]],
      [[`100% - ${slo}`, `100% - ${llw + slo}`], [`100% - ${sll + slo}`, `100% - ${llw + slo}`]]
    ];

    return [
      {
        name: 'shape',
        style: {
          strokeWidth: 0,
          fill: 'currentcolor'
        },
        polyline: [
          [0, 0],
          [0, '100%'],
          ['100%', '100%'],
          ['100%', 0]
        ]
      },
      ...largePolylines.map(polyline => ({
        name: 'polyline',
        style: {
          ...polylineStyle,
          strokeWidth: String(llw)
        },
        polyline
      })),
      ...smallPolylines.map(polyline => ({
        name: 'polyline',
        style: {
          ...polylineStyle,
          strokeWidth: String(slw)
        },
        polyline
      }))
    ] as FRAME_SVG_POLYLINE_GENERIC[];
  }, [llw, slw, sll]);

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvglines', className)}
      polylines={polylines}
    />
  );
};

export type { FrameSVGLinesProps };
export { FrameSVGLines };
