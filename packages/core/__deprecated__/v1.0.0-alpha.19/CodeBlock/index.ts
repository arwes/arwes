import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { CodeBlock as Component } from './CodeBlock.component';

const CodeBlock = withAnimator()(memo(Component));

export * from './CodeBlock.component';
export { CodeBlock };
