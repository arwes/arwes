// The <Button /> component encapsulates an animated <FrameComponent />.
// The <Button /> component will pass its received `animator` prop directly to the
// <FrameComponent /> to simplify the animator management.

/* @jsx jsx */
import {
  FC,
  ComponentType,
  HTMLAttributes,
  CSSProperties,
  MouseEvent,
  MutableRefObject,
  useState,
  useMemo,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorOutputProps, AnimatorFlow } from '@arwes/animation';
import { useBleeps } from '@arwes/sounds';

import { FrameUnderline } from '../FrameUnderline';
import { generateStyles } from './Button.styles';
import { highlightFrameBgs } from './Button.effects';

// TODO: Should there be a common FrameCommonComponentProps interface to share
// across components using composable frames? It could prevent the explicit
// interface definition in multiple components.
type ButtonPropsFrameComponent = ComponentType<HTMLAttributes<HTMLElement> & WithAnimatorOutputProps & { [prop: string]: any }>;

interface ButtonProps {
  FrameComponent?: ButtonPropsFrameComponent
  palette?: string
  active?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLButtonElement | null> | ((node: HTMLButtonElement) => void)
}

// The component will receive the `animator` as `AnimatorInstanceSettings` and
// not as `AnimatorRef` since it is encapsulating another animated component.
// That's why the props accepts `WithAnimatorOutputProps`.
const Button: FC<ButtonProps & WithAnimatorOutputProps> = props => {
  const {
    animator: animatorSettings,
    palette,
    disabled,
    active,
    onClick,
    className,
    style,
    rootRef: externalRootRef,
    children
  } = props;
  const FrameComponent = props.FrameComponent as ButtonPropsFrameComponent;

  const theme = useTheme();
  const bleeps = useBleeps();

  const styles = useMemo(
    () => generateStyles(theme, { palette, active, disabled }),
    [theme, palette, active, disabled]
  );

  // A copy of the <FrameComponent/> animator flow for the <Button/> functionalities.
  const [flow, setFlow] = useState<AnimatorFlow | null>(null);

  const internalRootRef = useRef<HTMLButtonElement | null>(null);
  const rootRef = useCallback((node: HTMLButtonElement) => {
    internalRootRef.current = node;

    if (typeof externalRootRef === 'function') {
      externalRootRef(node);
    }
    else if (externalRootRef) {
      externalRootRef.current = node;
    }
  }, []);

  const buttonOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const isAnimated = !!flow; // If flow, it means it's animated.
    const isEntered = isAnimated ? flow?.entered : true; // No animated? Then it's entered.
    const container = internalRootRef.current;

    if (!disabled && isEntered) {
      if (container) {
        highlightFrameBgs(container, theme, palette);
      }

      bleeps.click?.play();

      onClick?.(event);
    }
  };

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
      css={[
        styles.root,
        !!flow && !flow.entered && styles.rootIsTransitioning
      ]}
      style={style}
      rootRef={rootRef}
      palette={palette}
      disabled={disabled}
      hover
      shape
      onClick={buttonOnClick}
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
  style: PropTypes.object,
  rootRef: PropTypes.any
};

Button.defaultProps = {
  FrameComponent: FrameUnderline
};

export { ButtonProps, Button };
