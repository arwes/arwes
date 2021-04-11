/* @jsx jsx */
import { ReactElement } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { FRAME_POLYLINE, FrameProps, Frame } from '../utils/Frame';

interface FrameLinesProps <E> extends FrameProps<E> {
  largeLineWidth?: number
  smallLineWidth?: number
  smallLineLength?: number
  hideTopLines?: boolean
  hideBottomLines?: boolean
}

function FrameLines <E> (props: FrameLinesProps<E> & WithAnimatorInputProps): ReactElement {
  const {
    animator,
    className,
    largeLineWidth,
    smallLineWidth,
    smallLineLength,
    hideTopLines,
    hideBottomLines,
    ...otherProps
  } = props;
  const theme = useTheme();

  const llWidth = theme.outline(largeLineWidth);
  const slWidth = theme.outline(smallLineWidth);
  const slLength = smallLineLength as number;

  // Large Polylines.

  let largePolylines: FRAME_POLYLINE[] = [];

  if (!hideTopLines) {
    largePolylines = [
      [[0, 0], ['50% + 0.1', 0]],
      [['100%', 0], ['50% - 0.1', 0]]
    ];
  }

  if (!hideBottomLines) {
    largePolylines = largePolylines.concat([
      [[0, '100%'], ['50% + 0.1', '100%']],
      [['100%', '100%'], ['50% - 0.1', '100%']]
    ]);
  }

  // Small Polylines.

  let smallPolylines: FRAME_POLYLINE[] = [];

  if (!hideTopLines) {
    smallPolylines = [
      [[0, llWidth], [slLength, llWidth]],
      [['100%', llWidth], [`100% - ${slLength}`, llWidth]]
    ];
  }

  if (!hideBottomLines) {
    smallPolylines = smallPolylines.concat([
      [[0, `100% - ${llWidth}`], [slLength, `100% - ${llWidth}`]],
      [['100%', `100% - ${llWidth}`], [`100% - ${slLength}`, `100% - ${llWidth}`]]
    ]);
  }

  return (
    <Frame
      {...otherProps}
      className={cx('arwes-frame-lines', className)}
      shapes={[
        [
          [0, 0],
          [0, '100%'],
          ['100%', '100%'],
          ['100%', 0]
        ]
      ]}
      polylines={[
        ...largePolylines.map(polyline => ({
          polyline,
          lineWidth: llWidth
        })),
        ...smallPolylines.map(polyline => ({
          polyline,
          lineWidth: slWidth
        }))
      ]}
    />
  );
}

FrameLines.defaultProps = {
  largeLineWidth: 1,
  smallLineWidth: 1,
  smallLineLength: 10
};

export { FrameLinesProps, FrameLines };
