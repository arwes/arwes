import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { CodeBlock as Component } from './CodeBlock.component';
import { animator } from './CodeBlock.animator';

const CodeBlock = withAnimator(animator)(memo(Component));

export * from './CodeBlock.component';
export { CodeBlock };
