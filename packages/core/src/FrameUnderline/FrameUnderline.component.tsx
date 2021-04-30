/* @jsx jsx */
import { ReactElement } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animator';

import { FrameProps, Frame } from '../utils/Frame';
import { useBleepsOnAnimator } from '../utils/useBleepsOnAnimator';

interface FrameUnderlineProps <E> extends FrameProps<E> {
  lineWidth?: number
  squareSize?: number
}

function FrameUnderline <E> (props: FrameUnderlineProps<E> & WithAnimatorInputProps): ReactElement {
  const { animator, className, lineWidth, squareSize, ...otherProps } = props;
  const { space, outline } = useTheme();
  const ss = squareSize as number;

  useBleepsOnAnimator({
    entering: 'assemble',
    exiting: 'assemble'
  });

  return (
    <Frame
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
}

FrameUnderline.defaultProps = {
  lineWidth: 2,
  squareSize: 15
};

export { FrameUnderlineProps, FrameUnderline };
