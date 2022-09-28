// The <Button /> component encapsulates an animated <FrameComponent />.
// The <Button /> component will pass its received `animator` prop directly to the
// <FrameComponent /> to simplify the animator management.

// TODO: There needs to be a better way to compose animator components
// like the Button component manipulates the Framecomponent.

/* @jsx jsx */
import {
  ReactNode,
  ReactElement,
  MutableRefObject,
  CSSProperties,
  MouseEvent,
  useState,
  useMemo,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorOutputProps, AnimatorFlow } from '@arwes/animator';
import { useBleeps } from '@arwes/bleeps';

import { FRAME_SVG_EFFECTS } from '../FrameSVG';
import { FrameUnderline } from '../FrameUnderline';
import { generateStyles } from './Button.styles';

interface ButtonProps {
  // TODO: Properly create a type for a common composable frame component.
  FrameComponent?: any
  palette?: string
  active?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLButtonElement | null> | ((node: HTMLButtonElement) => void)
  children?: ReactNode
}

// The component will receive the `animator` as `AnimatorInstanceSettings` and
// not as `AnimatorRef` since it is encapsulating another animated component.
// That's why the props accepts `WithAnimatorOutputProps`, not the input one.
const Button = (props: ButtonProps & WithAnimatorOutputProps): ReactElement => {
  const {
    animator: animatorSettings,
    FrameComponent,
    palette,
    disabled,
    active,
    onClick,
    className,
    style,
    rootRef,
    children
  } = props;

  const theme = useTheme();
  const bleeps = useBleeps();
  const styles = useMemo(() => generateStyles(theme, { palette, disabled }), [theme, palette, disabled]);

  const effectsRef = useRef<FRAME_SVG_EFFECTS | null>(null);

  // A copy of the <FrameComponent/> animator flow for the <Button/> functionalities.
  const [flow, setFlow] = useState<AnimatorFlow | null>(null);

  const buttonOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const isAnimated = !!flow; // If flow exist, it means it's animated.
    const isEntered = isAnimated ? flow?.entered : true; // No animated? Then it's entered.

    if (!disabled && isEntered) {
      effectsRef.current?.highlight();
      bleeps.click?.play();
      onClick?.(event);
    }
  };

  return (
    <FrameComponent
      animator={{
        ...animatorSettings,
        onTransition: (flow: AnimatorFlow) => {
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
      effectsRef={effectsRef}
      palette={palette}
      disabled={disabled}
      hideShapes={!active}
      hover
      onClick={buttonOnClick}
    >
      {children}
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
  rootRef: PropTypes.any,
  children: PropTypes.any
};

Button.defaultProps = {
  FrameComponent: FrameUnderline
};

export { ButtonProps, Button };
