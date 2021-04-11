/* @jsx jsx */
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { expandCSSBoxProp } from '../utils/expandCSSBoxProp';
import { FRAME_POLYLINE, FRAME_POLYLINE_CUSTOM, FrameProps, Frame } from '../utils/Frame';

type FRAME_BOX_ORIGIN = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface FrameBoxProps <E> extends FrameProps<E> {
  origins?: FRAME_BOX_ORIGIN[]
  linesWidths?: number[]
}

function FrameBox <E> (props: FrameBoxProps<E> & WithAnimatorInputProps): ReactElement {
  const {
    animator,
    className,
    origins,
    linesWidths,
    ...otherProps
  } = props;
  const theme = useTheme();

  const originsList = expandCSSBoxProp(origins, 'center');
  const linesWidthsList = expandCSSBoxProp(linesWidths, 1).map(theme.outline);

  const polylinesRaw: FRAME_POLYLINE[] = [
    [[0, 0], ['100%', 0]], // top
    [['100%', 0], ['100%', '100%']], // right
    [['100%', '100%'], [0, '100%']], // bottom
    [[0, '100%'], [0, 0]] // left
  ];

  type POLYLINES_FILTERED = FRAME_POLYLINE_CUSTOM | null;

  const polylinesFiltered: POLYLINES_FILTERED[] = polylinesRaw
    .map((polyline, index) => {
      const scaleAxis = index === 0 || index === 2 ? 'scaleX' : 'scaleY';
      const transformOrigin = originsList[index];
      const lineWidth = linesWidthsList[index];

      if (!lineWidth) {
        return null;
      }

      const polylineCustom: FRAME_POLYLINE_CUSTOM = {
        polyline,
        lineWidth,
        css: { strokeLinecap: 'square' },
        animated: {
          initialStyles: { transform: `${scaleAxis}(0)`, transformOrigin },
          entering: { [scaleAxis]: 1 },
          exiting: { [scaleAxis]: 0 }
        }
      };

      return polylineCustom;
    });

  const polylines = polylinesFiltered.filter(Boolean) as FRAME_POLYLINE_CUSTOM[];

  return (
    <Frame
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
  linesWidths: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
};

FrameBox.defaultProps = {
  origins: 'center',
  linesWidths: 1
};

export { FrameBoxProps, FrameBox };
