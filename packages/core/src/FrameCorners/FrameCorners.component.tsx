/* @jsx jsx */
import { HTMLAttributes, ReactElement } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { FRAME_POLYLINE, FrameProps, Frame } from '../utils/Frame';

interface FrameCornersProps <E> extends FrameProps<E> {
  cornerWidth?: number
  cornerLength?: number
  showContentLines?: boolean
  contentLineWidth?: number
}

function FrameCorners <E = HTMLDivElement, P = HTMLAttributes<E>> (props: FrameCornersProps<E> & P & WithAnimatorInputProps): ReactElement {
  const {
    animator,
    className,
    cornerWidth,
    cornerLength,
    showContentLines,
    contentLineWidth,
    ...otherProps
  } = props;
  const { outline, space } = useTheme();

  const cw = outline(cornerWidth);
  const cl = space(cornerLength);

  let contentPolylines: FRAME_POLYLINE[] = [];

  if (showContentLines) {
    const yAnimated = {
      initialStyles: { transform: 'scaleY(0)' },
      entering: { scaleY: 1 },
      exiting: { scaleY: 0 }
    };
    const xAnimated = {
      initialStyles: { transform: 'scaleX(0)' },
      entering: { scaleX: 1 },
      exiting: { scaleX: 0 }
    };

    contentPolylines = [
      {
        lines: [[cw, cw], [cw, `100% - ${cw}`]],
        animated: yAnimated
      },
      {
        lines: [[`100% - ${cw}`, cw], [`100% - ${cw}`, `100% - ${cw}`]],
        animated: yAnimated
      },
      {
        lines: [[cw, cw], [`100% - ${cw}`, cw]],
        animated: xAnimated
      },
      {
        lines: [[cw, `100% - ${cw}`], [`100% - ${cw}`, `100% - ${cw}`]],
        animated: xAnimated
      }
    ].map(contentLine => ({
      ...contentLine,
      outline: outline(contentLineWidth),
      css: { transformOrigin: 'center', opacity: 0.5 }
    }));
  }

  const cornerPolylines = [
    [[0, 0], [0, cl]],
    [[0, 0], [cl, 0]],
    [['100%', 0], [`100% - ${cl}`, 0]],
    [['100%', 0], ['100%', cl]],
    [['100%', '100%'], [`100% - ${cl}`, '100%']],
    [['100%', '100%'], ['100%', `100% - ${cl}`]],
    [[0, '100%'], [0, `100% - ${cl}`]],
    [[0, '100%'], [cl, '100%']]
  ].map(polyline => ({
    lines: polyline,
    css: { strokeLinecap: 'square' }
  }));

  return (
    <Frame<E>
      {...otherProps}
      className={cx('arwes-frame-corners', className)}
      shapes={[
        [
          [cw, cw],
          [cw, `100% - ${cw}`],
          [`100% - ${cw}`, `100% - ${cw}`],
          [`100% - ${cw}`, cw]
        ]
      ]}
      polylines={[
        ...contentPolylines,
        ...cornerPolylines
      ]}
      outline={cw}
    />
  );
}

FrameCorners.defaultProps = {
  cornerWidth: 1,
  cornerLength: 2,
  contentLineWidth: 1
};

export { FrameCornersProps, FrameCorners };
