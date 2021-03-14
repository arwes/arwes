import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { CodeBlockProps, CodeBlock as Component } from './CodeBlock.component';
import { animator } from './CodeBlock.animator';

const CodeBlock: FC<CodeBlockProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { CodeBlockProps, CodeBlock };
