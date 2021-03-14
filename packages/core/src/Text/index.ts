import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { TextProps, Text as Component } from './Text.component';
import { animator } from './Text.animator';

const Text: FC<TextProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { TextProps, Text };
