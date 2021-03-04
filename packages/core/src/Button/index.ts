import { FC } from 'react';
import { WithAnimatorOutputProps } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { ButtonProps, Button as Component } from './Button.component';
import { bleepsSettings } from './Button.bleeps';

const Button: FC<ButtonProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
    withBleeps(bleepsSettings)(Component as any);

export { ButtonProps, Button };
