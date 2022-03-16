import { memo } from 'react';

import { Animator as AnimatorComponent } from './Animator';

// TODO: Optimize props comparision.
const Animator = memo(AnimatorComponent);

export { Animator };
