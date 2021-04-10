/* @jsx jsx */
import { HTMLAttributes, ReactElement } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { FrameProps, Frame } from '../utils/Frame';

interface FrameLinesProps <E> extends FrameProps<E> {
  longLineWidth?: number
  smallLineWidth?: number
  smallLineLength?: number
}

function FrameLines <E = HTMLDivElement, P = HTMLAttributes<E>> (props: FrameLinesProps<E> & P & WithAnimatorInputProps): ReactElement {
  const {
    animator,
    className,
    longLineWidth,
    smallLineWidth,
    smallLineLength,
    ...otherProps
  } = props;
  const { outline } = useTheme();
  const llw = outline(longLineWidth);
  const slw = outline(smallLineWidth);
  const sll = outline(smallLineLength);

  const longPolylines = [
    [[0, 0], ['52%', 0]],
    [['100%', 0], ['52%', 0]],
    [[0, '100%'], ['52%', '100%']],
    [['100%', '100%'], ['52%', '100%']]
  ].map(polyline => ({
    lines: polyline,
    outline: llw
  }));

  const smallPolylines = [
    [[0, llw], [sll, llw]], // left top
    [['100%', llw], [`100% - ${sll}`, llw]], // right top
    [[0, `100% - ${llw}`], [sll, `100% - ${llw}`]], // left bottom
    [['100%', `100% - ${llw}`], [`100% - ${sll}`, `100% - ${llw}`]] // right bottom
  ].map(polyline => ({
    lines: polyline,
    outline: slw
  }));

  return (
    <Frame<E>
      {...otherProps}
      className={cx('arwes-frame-underline', className)}
      shapes={[
        [
          [0, 0],
          [0, '100%'],
          ['100%', '100%'],
          ['100%', 0]
        ]
      ]}
      polylines={[
        ...longPolylines,
        ...smallPolylines
      ]}
    />
  );
}

FrameLines.defaultProps = {
  longLineWidth: 1,
  smallLineWidth: 1,
  smallLineLength: 10
};

export { FrameLinesProps, FrameLines };
