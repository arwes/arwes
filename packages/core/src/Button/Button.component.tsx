/* @jsx jsx */
import { FC, ComponentClass, MouseEvent, MutableRefObject, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { FrameUnderline } from '../FrameUnderline';
import { generateStyles } from './Button.styles';

interface ButtonProps {
  FrameComponent: FC<any> | ComponentClass<any>
  frameProps?: any
  palette?: 'primary' | 'secondary' | string
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  rootRef?: MutableRefObject<HTMLButtonElement> | ((node: HTMLButtonElement) => void)
  className?: string
}

const Button: FC<ButtonProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    FrameComponent,
    frameProps,
    palette,
    disabled,
    onClick,
    rootRef,
    className,
    children
  } = props;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { palette, disabled }),
    [theme, palette, disabled]
  );

  return (
    <button
      className={cx('arwes-button', className)}
      css={[
        styles.root,
        !animator.flow.entered && styles.rootIsTransitioning
      ]}
      ref={rootRef}
      disabled={disabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (animator.flow.entered) {
          bleeps.click?.play();
          onClick?.(event);
        }
      }}
    >
      <FrameComponent
        palette={palette}
        disabled={disabled}
        hover
        {...frameProps}
        animator={{
          merge: true,
          ...frameProps?.animator
        }}
        className={cx('arwes-button__frame', frameProps?.className)}
      >
        <div
          className='arwes-button__content'
          css={styles.content}
        >
          {children}
        </div>
      </FrameComponent>
    </button>
  );
};

Button.propTypes = {
  FrameComponent: PropTypes.any.isRequired,
  frameProps: PropTypes.object,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  rootRef: PropTypes.any
};

Button.defaultProps = {
  FrameComponent: FrameUnderline
};

export { ButtonProps, Button };
