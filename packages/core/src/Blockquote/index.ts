import { FC } from 'react';
import { AnimatorClassSettings, WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { BlockquoteProps, Blockquote as Component } from './Blockquote.component';

const classAnimatorSettings: AnimatorClassSettings = {
  manager: 'stagger'
};

const Blockquote: FC<BlockquoteProps & WithAnimatorOutputProps> = withAnimator(classAnimatorSettings)(Component);

export { BlockquoteProps, Blockquote };
