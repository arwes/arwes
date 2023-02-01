import { memo } from 'react';
import { Text as Component } from './Text';

const Text: typeof Component = memo(Component) as any;

export * from './Text';
export { Text };
