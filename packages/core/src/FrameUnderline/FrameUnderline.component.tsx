/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { generateStyles } from './FrameUnderline.styles';

interface FrameUnderlineProps {
  as?: keyof HTMLElementTagNameMap
  palette?: 'primary' | 'secondary' | string
  hover?: boolean
  disabled?: boolean
  rootRef?: MutableRefObject<HTMLDivElement> | ((node: HTMLDivElement) => void)
  className?: string
}

const FrameUnderline: FC<FrameUnderlineProps & HTMLAttributes<HTMLElement> & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    as: asProvided,
    palette,
    hover,
    disabled,
    rootRef,
    className,
    children,
    ...otherProps
  } = props;
  const { animate } = animator;

  const theme = useTheme();
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
      className: cx('arwes-frame-underline', className),
      css: styles.root,
      ref: rootRef
    },
    <div
      className='arwes-frame-underline__container'
      css={styles.container}
      ref={containerRef}
    >
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
  className: PropTypes.string,
  rootRef: PropTypes.any
};

FrameUnderline.defaultProps = {
  as: 'div'
};

export { FrameUnderlineProps, FrameUnderline };
