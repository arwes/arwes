/* @jsx jsx */
import { FC, MutableRefObject, CSSProperties, useRef, useMemo, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { useBleeps } from '@arwes/sounds';

import { ARWES_CORE_FRAME_CLASSNAME, ARWES_CORE_FRAME_BG_CLASSNAME } from '../constants';
import { generateStyles } from './FrameUnderline.styles';

interface FrameUnderlineProps {
  as?: keyof HTMLElementTagNameMap
  palette?: string
  hover?: boolean
  disabled?: boolean
  shape?: boolean
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
}

const FrameUnderline: FC<FrameUnderlineProps & HTMLAttributes<HTMLElement> & WithAnimatorInputProps> = props => {
  const {
    animator,
    as: asProvided,
    palette,
    hover,
    disabled,
    shape,
    className,
    style,
    rootRef,
    children,
    ...otherProps
  } = props;
  const { animate } = animator;

  const theme = useTheme();
  const bleeps = useBleeps();

  const styles = useMemo(
    () => generateStyles(theme, { animate, palette, hover, disabled }),
    [theme, animate, palette, hover, disabled]
  );

  // The "as" prop must not be updated.
  const as = useMemo(() => asProvided || 'div', []);

  const containerRef = useRef<HTMLDivElement>(null);

  animator.setupAnimateRefs(containerRef, theme, bleeps);

  return jsx(
    as,
    {
      ...otherProps,
      className: cx('arwes-frame-underline', ARWES_CORE_FRAME_CLASSNAME, className),
      css: styles.root,
      style,
      ref: rootRef
    },
    <div
      className='arwes-frame-underline__container'
      css={styles.container}
      ref={containerRef}
    >
      {!!shape && (
        <div
          className='arwes-frame-underline__shapes'
          css={styles.shapes}
        >
          <div
            className={`arwes-frame-underline__shape ${ARWES_CORE_FRAME_BG_CLASSNAME}`}
            css={[styles.shape, styles.shape1, styles.bg]}
          />
          <div
            className={`arwes-frame-underline__shape ${ARWES_CORE_FRAME_BG_CLASSNAME}`}
            css={[styles.shape, styles.shape2, styles.bg]}
          />
          <div
            className='arwes-frame-underline__shape'
            css={[styles.shape, styles.shape3]}
          >
            <div
              className={`arwes-frame-underline__shape ${ARWES_CORE_FRAME_BG_CLASSNAME}`}
              css={[styles.shape, styles.shape3A, styles.bg]}
            />
          </div>
        </div>
      )}

      <div
        className='arwes-frame-underline__line arwes-frame-underline__line-1'
        css={[styles.line, styles.line1]}
      />
      <div
        className='arwes-frame-underline__line arwes-frame-underline__line-2'
        css={[styles.line, styles.line2]}
      />

      <div
        className='arwes-frame-underline__content'
        css={styles.content}
      >
        {children}
      </div>
    </div>
  );
};

FrameUnderline.propTypes = {
  // @ts-expect-error
  as: PropTypes.string.isRequired,
  palette: PropTypes.string,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  shape: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

FrameUnderline.defaultProps = {
  as: 'div'
};

export { FrameUnderlineProps, FrameUnderline };
