import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Blockquote as Component } from './Blockquote.component';
import { animator } from './Blockquote.animator';

const Blockquote = withAnimator(animator)(memo(Component));

export * from './Blockquote.component';
export { Blockquote };
