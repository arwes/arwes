import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { TextField as Component } from './TextField.component';

const TextField = withAnimator()(memo(Component));

export * from './TextField.component';
export { TextField };
