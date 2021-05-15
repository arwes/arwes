/* @jsx jsx */
import { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';

import { useBleepsOnAnimator } from '../utils/useBleepsOnAnimator';
import { FRAME_SVG_POLYLINE, FrameSVGProps, FrameSVG } from '../FrameSVG';

interface FrameHexagonProps extends FrameSVGProps {
  lineWidth?: number
  squareSize?: number
  inverted?: boolean
  children?: ReactNode
}

const FrameHexagon = (props: FrameHexagonProps): ReactElement => {
  const { className, lineWidth, squareSize, inverted, ...otherProps } = props;

  useBleepsOnAnimator({
    entering: 'assemble',
    exiting: 'assemble'
  });

  const { space, outline } = useTheme();
  const ss = squareSize as number;

  // Polylines without repeated points between them.
  let polyline1: FRAME_SVG_POLYLINE = [];
  let polyline2: FRAME_SVG_POLYLINE = [];

  if (!inverted) {
    polyline1 = [
      [0, '100%'],
      [`100% - ${ss}`, '100%'],
      ['100%', `100% - ${ss}`],
      ['100%', 0]
    ];
    polyline2 = [
      [ss, 0],
      [0, ss]
    ];
  }
  else {
    polyline1 = [
      [0, 0],
      [0, `100% - ${ss}`],
      [ss, '100%'],
      ['100%', '100%']
    ];
    polyline2 = [
      ['100%', ss],
      [`100% - ${ss}`, 0]
    ];
  }

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frame-hexagon', className)}
      css={{
        padding: `${space(2)}px ${space(4)}px`
      }}
      shapes={[
        polyline1.concat(polyline2)
      ]}
      polylines={[
        polyline1,
        // Polyline2 joins with ending vertexes of Polyline1.
        [
          polyline1[polyline1.length - 1],
          ...polyline2,
          polyline1[0]
        ]
      ]}
      lineWidth={outline(lineWidth)}
    />
  );
};

FrameHexagon.propTypes = {
  lineWidth: PropTypes.number,
  squareSize: PropTypes.number,
  inverted: PropTypes.bool,
  children: PropTypes.any
};

FrameHexagon.defaultProps = {
  lineWidth: 1,
  squareSize: 15
};

export { FrameHexagonProps, FrameHexagon };
