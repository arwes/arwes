import { memo } from 'react';

/**
 * Extracted from https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issuecomment-542793243
 */
const memoTyped: <T>(c: T) => T = memo;

export { memoTyped };
