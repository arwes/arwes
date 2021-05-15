/* @jsx jsx */
import { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';

import { FrameSVGProps, FrameSVG } from '../FrameSVG';
import { useBleepsOnAnimator } from '../utils/useBleepsOnAnimator';

interface FrameUnderlineProps extends FrameSVGProps {
  lineWidth?: number
  squareSize?: number
  children?: ReactNode
}

const FrameUnderline = (props: FrameUnderlineProps): ReactElement => {
  const { className, lineWidth, squareSize, ...otherProps } = props;
  const { space, outline } = useTheme();
  const ss = squareSize as number;

  useBleepsOnAnimator({
    entering: 'assemble',
    exiting: 'assemble'
  });

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frame-underline', className)}
      css={{
        padding: `${space(2)}px ${space(4)}px`
      }}
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
      lineWidth={outline(lineWidth)}
    />
  );
};

FrameUnderline.propTypes = {
  lineWidth: PropTypes.number,
  squareSize: PropTypes.number,
  children: PropTypes.any
};

FrameUnderline.defaultProps = {
  lineWidth: 2,
  squareSize: 15
};

export { FrameUnderlineProps, FrameUnderline };
