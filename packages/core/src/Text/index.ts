import { Text as Component, TextProps } from './Text.component';

import { animator } from './Text.animator';
import { withAnimator } from '@arwes/animator';

const Text = withAnimator(animator)(Component);

export { TextProps, Text };
