/* eslint-env jest */

import type { AnimatorNode } from '../../types';
import { ANIMATOR_STATES } from '../../constants';
import { createAnimatorMachine } from './createAnimatorMachine';

test('Should create a node machine with predefined structure', () => {
  const node = {} as unknown as AnimatorNode;
  const machine = createAnimatorMachine(node, ANIMATOR_STATES.exited);
  expect(machine).toEqual({
    getState: expect.any(Function),
    send: expect.any(Function)
  });
});
