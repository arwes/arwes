import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { TextProps, Text as Component } from './Text.component';
import { animator } from './Text.animator';
import { bleepsSettings } from './Text.bleeps';

const Text: FC<TextProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator(animator)(
    withBleeps(bleepsSettings)(Component as any) as any
  ) as any;

export { TextProps, Text };
