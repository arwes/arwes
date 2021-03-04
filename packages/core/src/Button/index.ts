import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { ButtonProps, Button as Component } from './Button.component';
import { bleepsSettings } from './Button.bleeps';

const Button: FC<ButtonProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator()(
    withBleeps(bleepsSettings)(Component as any) as any
  );

export { ButtonProps, Button };
