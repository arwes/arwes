import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { BlockquoteProps, Blockquote as Component } from './Blockquote.component';
import { animator } from './Blockquote.animator';

const Blockquote: FC<BlockquoteProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { BlockquoteProps, Blockquote };
