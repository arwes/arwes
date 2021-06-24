import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Checkbox as Component } from './Checkbox.component';

const Checkbox = withAnimator()(memo(Component));

export * from './Checkbox.component';
export { Checkbox };
