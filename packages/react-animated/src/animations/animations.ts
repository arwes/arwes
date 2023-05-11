import { timeline } from 'motion';

import type { AnimatedSettings } from '../types';

const aa = (prop: string, from: number | string, to: number | string, back?: number | string): AnimatedSettings => ({
  transitions: {
    entering: { [prop]: [from, to] },
    exiting: { [prop]: [to, back ?? from] }
  }
});

const aaOpacity = (): AnimatedSettings => aa('opacity', 0, 1);

const aaVisibility = (): AnimatedSettings => {
  return {
    transitions: {
      entering: ({ element, duration }) => timeline(
        [
          [element, { opacity: [0, 1] }],
          [element, { opacity: [1, 0.7] }],
          [element, { opacity: [0.7, 1] }]
        ],
        { duration }
      ),
      exiting: ({ element, duration }) => timeline(
        [
          [element, { opacity: [1, 0] }],
          [element, { opacity: [0, 0.3] }],
          [element, { opacity: [0.3, 0] }]
        ],
        { duration }
      )
    }
  };
};

export { aa, aaOpacity, aaVisibility };
