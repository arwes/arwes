import { AnimatorClassSettings, withAnimator } from '@arwes/animator';
import { BlockquoteProps, Blockquote as Component } from './Blockquote.component';

const classAnimatorSettings: AnimatorClassSettings = {
  manager: 'stagger'
};

const Blockquote = withAnimator(classAnimatorSettings)(Component);

export { BlockquoteProps, Blockquote };
