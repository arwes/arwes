/* @jsx jsx */
import { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';

import { useBleepsOnAnimator } from '../utils/useBleepsOnAnimator';
import { FRAME_SVG_POLYLINE, FrameSVGProps, FrameSVG } from '../FrameSVG';

interface FrameLinesProps extends FrameSVGProps {
  largeLineWidth?: number
  smallLineWidth?: number
  smallLineLength?: number
  hideTopLines?: boolean
  hideBottomLines?: boolean
  children?: ReactNode
}

const FrameLines = (props: FrameLinesProps): ReactElement => {
  const {
    className,
    largeLineWidth,
    smallLineWidth,
    smallLineLength,
    hideTopLines,
    hideBottomLines,
    ...otherProps
  } = props;

  useBleepsOnAnimator({
    entering: 'assemble',
    exiting: 'assemble'
  });

  const theme = useTheme();
  const llWidth = theme.outline(largeLineWidth);
  const slWidth = theme.outline(smallLineWidth);
  const slLength = smallLineLength as number;

  // Large Polylines.

  let largePolylines: FRAME_SVG_POLYLINE[] = [];

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

  let smallPolylines: FRAME_SVG_POLYLINE[] = [];

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
    <FrameSVG
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
};

FrameLines.propTypes = {
  largeLineWidth: PropTypes.number,
  smallLineWidth: PropTypes.number,
  smallLineLength: PropTypes.number,
  hideTopLines: PropTypes.bool,
  hideBottomLines: PropTypes.bool,
  children: PropTypes.any
};

FrameLines.defaultProps = {
  largeLineWidth: 1,
  smallLineWidth: 1,
  smallLineLength: 10
};

export { FrameLinesProps, FrameLines };
