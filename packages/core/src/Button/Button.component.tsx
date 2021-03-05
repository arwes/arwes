// The <Button /> component encapsulates an animated <FrameComponent />.
// The <Button /> component will pass its received `animator` prop directly to the
// <FrameComponent /> to simplify the animator management.

/* @jsx jsx */
import {
  FC,
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  MutableRefObject,
  useState,
  useMemo
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorOutputProps, AnimatorFlow } from '@arwes/animation';
import { WithBleepsOutputProps, WithBleepsInputProps } from '@arwes/sounds';

import { FrameUnderline } from '../FrameUnderline';
import { generateStyles } from './Button.styles';

interface ButtonProps {
  FrameComponent: ComponentType<HTMLAttributes<HTMLElement> & WithAnimatorOutputProps & WithBleepsOutputProps & { [prop: string]: any }>
  palette?: string
  active?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  rootRef?: MutableRefObject<HTMLElement> | ((node: HTMLElement) => void)
  className?: string
}

// The component will receive the `animator` as `AnimatorInstanceSettings` and
// not as `AnimatorRef` since it is encapsulating another animated component.
// That's why the props accepts `WithAnimatorOutputProps`.
const Button: FC<ButtonProps & WithAnimatorOutputProps & WithBleepsInputProps> = props => {
  const {
    animator: animatorSettings,
    bleeps,
    FrameComponent,
    palette,
    disabled,
    active,
    onClick,
    rootRef,
    className,
    children
  } = props;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { palette, active, disabled }),
    [theme, palette, active, disabled]
  );

  const [flow, setFlow] = useState<AnimatorFlow | null>(null);

  return (
    <FrameComponent
      animator={{
        ...animatorSettings,
        onTransition: flow => {
          setFlow(flow);
          animatorSettings?.onTransition?.(flow);
        }
      }}
      as='button'
      className={cx('arwes-button', className)}
      rootRef={rootRef}
      css={[
        styles.root,
        !!flow && !flow.entered && styles.rootIsTransitioning
      ]}
      palette={palette}
      disabled={disabled}
      hover
      shape
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (flow?.entered) {
          bleeps.click?.play();
          onClick?.(event);
        }
      }}
    >
      <div
        className='arwes-button__content'
        css={styles.content}
      >
        {children}
      </div>
    </FrameComponent>
  );
};

Button.propTypes = {
  FrameComponent: PropTypes.any.isRequired,
  palette: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  rootRef: PropTypes.any
};

Button.defaultProps = {
  FrameComponent: FrameUnderline
};

export { ButtonProps, Button };
