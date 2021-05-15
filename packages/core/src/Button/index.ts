import { memo } from 'react';

import { Button as Component } from './Button.component';

const Button = memo(Component);

export * from './Button.component';
export { Button };
