/* @jsx jsx */
import { FC, MutableRefObject, CSSProperties, useMemo, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import {
  ARWES_CORE_FRAME_CLASSNAME,
  ARWES_CORE_FRAME_LINE_CLASSNAME,
  ARWES_CORE_FRAME_SHAPE_CLASSNAME,
  ARWES_CORE_FRAME_BG_CLASSNAME,
  ARWES_CORE_FRAME_CONTENT_CLASSNAME
} from '../constants';
import { expandCSSBoxProp } from '../utils/expandCSSBoxProp';
import { transitionAppear, transitionDisappear } from '../utils/appearTransitions';
import { Animated } from '../utils/Animated';
import { generateStyles } from './FrameLines.styles';

type TransformOrigin = CSSProperties['transformOrigin'];

// TODO: Set proper HTML element typings according to "as" prop value.
// For now, all animated elements are asumed to be DIV elements.
interface FrameLinesProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof HTMLElementTagNameMap
  outlines?: number | number[]
  origins?: TransformOrigin | TransformOrigin[]
  palette?: string
  active?: boolean
  hover?: boolean
  disabled?: boolean
  shape?: boolean
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
}

const FrameLines: FC<FrameLinesProps & WithAnimatorInputProps> = props => {
  const {
    animator,
    as: asProvided,
    outlines: outlinesProvided,
    origins: originsProvided,
    palette,
    active,
    hover,
    disabled,
    shape,
    className,
    style,
    rootRef,
    children,
    ...otherProps
  } = props;

  const theme = useTheme();

  const as = useMemo(() => asProvided || 'div', []);

  const outlines = useMemo(
    () => expandCSSBoxProp<number>(outlinesProvided, 1),
    [outlinesProvided]
  );

  const origins = useMemo(
    () => expandCSSBoxProp<TransformOrigin>(originsProvided, 'center'),
    [originsProvided]
  );

  const styles = useMemo(
    () => generateStyles(theme, { outlines, origins, palette, active, hover, disabled }),
    [theme, outlines, origins, palette, active, hover, disabled]
  );

  return jsx(
    as,
    {
      ...otherProps,
      className: cx('arwes-frame-lines', ARWES_CORE_FRAME_CLASSNAME, className),
      css: styles.root,
      style,
      ref: rootRef
    },
    !!shape && (
      <Animated
        className={ARWES_CORE_FRAME_SHAPE_CLASSNAME}
        css={styles.shape}
        animated={{
          initialStyle: { opacity: 0 },
          entering: transitionAppear,
          exiting: transitionDisappear
        }}
      >
        <div
          className={ARWES_CORE_FRAME_BG_CLASSNAME}
          css={styles.bg}
        />
      </Animated>
    ),
    outlines.map((outline, index) => {
      if (!outline) return null;
      const scaleAxis = index === 0 || index === 2 ? 'scaleX' : 'scaleY';
      return (
        <Animated
          key={index}
          className={ARWES_CORE_FRAME_LINE_CLASSNAME}
          css={[styles.line, styles[`line${index}`]]}
          animated={{
            initialStyle: { transform: `${scaleAxis}(0)` },
            entering: { [scaleAxis]: 1 },
            exiting: { [scaleAxis]: 0 }
          }}
        />
      );
    }),
    <div
      className={ARWES_CORE_FRAME_CONTENT_CLASSNAME}
      css={styles.content}
    >
      {children}
    </div>
  );
};

FrameLines.propTypes = {
  // @ts-expect-error
  as: PropTypes.string.isRequired,
  // @ts-expect-error
  outlines: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  // @ts-expect-error
  origins: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  palette: PropTypes.string,
  active: PropTypes.bool,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  shape: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

FrameLines.defaultProps = {
  as: 'div',
  outlines: 1,
  origins: 'center',
  palette: 'primary'
};

export { FrameLinesProps, FrameLines };
