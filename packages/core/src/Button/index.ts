import { FC } from 'react';
import { WithAnimatorOutputProps } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { ButtonProps, Button as Component } from './Button.component';
import { bleepsSettings } from './Button.bleeps';

// The `<Button/>` is encapsulating the animator of another component, so it does
// not use the `withAnimator` HOC but it provides the same public API with
// `WithAnimatorOutputProps`.
const Button: FC<ButtonProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withBleeps(bleepsSettings)(Component as any);

export { ButtonProps, Button };
