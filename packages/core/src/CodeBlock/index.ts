import { CodeBlockProps, CodeBlock as Component } from './CodeBlock.component';

import { animator } from './CodeBlock.animator';
import { withAnimator } from '@arwes/animator';

const CodeBlock = withAnimator(animator)(Component);

export { CodeBlockProps, CodeBlock };
