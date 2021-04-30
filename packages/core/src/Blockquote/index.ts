import { FC } from 'react';
import { AnimatorClassSettings, WithAnimatorOutputProps, withAnimator } from '@arwes/animator';

import { BlockquoteProps, Blockquote as Component } from './Blockquote.component';

const classAnimatorSettings: AnimatorClassSettings = {
  manager: 'stagger'
};

const Blockquote: FC<BlockquoteProps & WithAnimatorOutputProps> = withAnimator(classAnimatorSettings)(Component);

export { BlockquoteProps, Blockquote };
