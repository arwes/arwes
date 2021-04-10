/* @jsx jsx */
import { HTMLAttributes, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { expandCSSBoxProp } from '../utils/expandCSSBoxProp';
import { FrameProps, Frame } from '../utils/Frame';

type FRAME_BOX_ORIGIN = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface FrameBoxProps <E> extends FrameProps<E> {
  origins?: FRAME_BOX_ORIGIN[]
  outlines?: number[]
}

function FrameBox <E = HTMLDivElement, P = HTMLAttributes<E>> (props: FrameBoxProps<E> & P & WithAnimatorInputProps): ReactElement {
  const {
    animator,
    className,
    origins,
    outlines,
    ...otherProps
  } = props;

  const originsList = expandCSSBoxProp(origins, 'center');
  const outlinesList = expandCSSBoxProp(outlines, 1);
  const polylinesLinesPoints = [
    [[0, 0], ['100%', 0]], // top
    [['100%', 0], ['100%', '100%']], // right
    [['100%', '100%'], [0, '100%']], // bottom
    [[0, '100%'], [0, 0]] // left
  ];
  const polylines = polylinesLinesPoints
    .map((polylineLinesPoints, index) => {
      const scaleAxis = index === 0 || index === 2 ? 'scaleX' : 'scaleY';
      const transformOrigin = originsList[index];
      const outline = outlinesList[index];

      if (!outline) {
        return null;
      }

      return {
        outline,
        lines: polylineLinesPoints,
        css: { strokeLinecap: 'square' },
        animated: {
          initialStyles: { transform: `${scaleAxis}(0)`, transformOrigin },
          entering: { [scaleAxis]: 1 },
          exiting: { [scaleAxis]: 0 }
        }
      };
    })
    .filter(Boolean);

  return (
    <Frame<E>
      {...otherProps}
      className={cx('arwes-frame-box', className)}
      shapes={[
        [
          [0, 0],
          [0, '100%'],
          ['100%', '100%'],
          ['100%', 0]
        ]
      ]}
      polylines={polylines}
    />
  );
};

FrameBox.propTypes = {
  origins: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  outlines: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
};

FrameBox.defaultProps = {
  origins: 'center',
  outlines: 1
};

export { FrameBoxProps, FrameBox };
