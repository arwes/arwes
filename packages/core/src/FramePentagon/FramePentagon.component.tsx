/* @jsx jsx */
import { HTMLAttributes, ReactElement } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { FrameProps, Frame } from '../utils/Frame';

interface FramePentagonProps <E> extends FrameProps<E> {
  lineWidth?: number
  squareSize?: number
}

function FramePentagon <E = HTMLDivElement, P = HTMLAttributes<E>> (props: FramePentagonProps<E> & P & WithAnimatorInputProps): ReactElement {
  const { animator, className, lineWidth, squareSize, ...otherProps } = props;
  const { space, outline } = useTheme();
  const ss = space(squareSize);

  return (
    <Frame<E>
      {...otherProps}
      className={cx('arwes-frame-pentagon', className)}
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
          ['100%', `100% - ${ss}`],
          ['100%', 0]
        ],
        [
          ['100%', 0],
          [0, 0],
          [0, '100%']
        ]
      ]}
      outline={outline(lineWidth)}
    />
  );
}

FramePentagon.defaultProps = {
  lineWidth: 1,
  squareSize: 3
};

export { FramePentagonProps, FramePentagon };
