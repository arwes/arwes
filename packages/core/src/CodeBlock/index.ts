import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { CodeBlockProps, CodeBlock as Component } from './CodeBlock.component';
import { animator } from './CodeBlock.animator';
import { bleepsSettings } from './CodeBlock.bleeps';

const CodeBlock: FC<CodeBlockProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator(animator)(
    withBleeps(bleepsSettings)(Component as any) as any
  ) as any;

export { CodeBlockProps, CodeBlock };
