import { memo } from '@arwes/tools';
import { MovingLines as Component } from './MovingLines';

const MovingLines = memo(Component);

export * from './MovingLines.types';
export { MovingLines };
