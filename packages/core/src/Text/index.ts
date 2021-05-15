import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Text as Component, TextProps } from './Text.component';
import { animator } from './Text.animator';

const Text = withAnimator(animator)(memo(Component));

export { TextProps, Text };
