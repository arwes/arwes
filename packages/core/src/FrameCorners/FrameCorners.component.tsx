/* @jsx jsx */
import { FC } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animator';

import { useBleepsOnAnimator } from '../utils/useBleepsOnAnimator';
import { FRAME_POLYLINE_GENERIC, FrameProps, Frame } from '../utils/Frame';

interface FrameCornersProps extends FrameProps {
  cornerWidth?: number
  cornerLength?: number
  showContentLines?: boolean
  contentLineWidth?: number
}

const FrameCorners: FC<FrameCornersProps & WithAnimatorInputProps> = props => {
  const {
    animator,
    className,
    cornerWidth,
    cornerLength,
    showContentLines,
    contentLineWidth,
    ...otherProps
  } = props;

  useBleepsOnAnimator({
    entering: 'assemble',
    exiting: 'assemble'
  });

  const theme = useTheme();
  const cw = theme.outline(cornerWidth);
  const cl = cornerLength as number;

  let contentPolylines: FRAME_POLYLINE_GENERIC[] = [];

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
        polyline: [[cw, cw], [cw, `100% - ${cw}`]],
        animated: yAnimated
      },
      {
        polyline: [[`100% - ${cw}`, cw], [`100% - ${cw}`, `100% - ${cw}`]],
        animated: yAnimated
      },
      {
        polyline: [[cw, cw], [`100% - ${cw}`, cw]],
        animated: xAnimated
      },
      {
        polyline: [[cw, `100% - ${cw}`], [`100% - ${cw}`, `100% - ${cw}`]],
        animated: xAnimated
      }
    ].map(contentLine => ({
      ...contentLine,
      lineWidth: theme.outline(contentLineWidth),
      css: { transformOrigin: 'center', opacity: 0.5 }
    }));
  }

  const cornerPolylines: FRAME_POLYLINE_GENERIC[] = [
    [[0, 0], [0, cl]],
    [[0, 0], [cl, 0]],
    [['100%', 0], [`100% - ${cl}`, 0]],
    [['100%', 0], ['100%', cl]],
    [['100%', '100%'], [`100% - ${cl}`, '100%']],
    [['100%', '100%'], ['100%', `100% - ${cl}`]],
    [[0, '100%'], [0, `100% - ${cl}`]],
    [[0, '100%'], [cl, '100%']]
  ].map(polyline => ({
    polyline,
    css: { strokeLinecap: 'square' }
  }));

  return (
    <Frame
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
      lineWidth={cw}
    />
  );
};

FrameCorners.defaultProps = {
  cornerWidth: 1,
  cornerLength: 10,
  contentLineWidth: 1
};

export { FrameCornersProps, FrameCorners };
