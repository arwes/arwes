import { timeline } from 'motion';

import type { AnimatedSettings } from '../types';

const aaProperty = (prop: string, from: number | string, to: number | string): AnimatedSettings => ({
  initialStyle: { [prop]: from },
  transitions: {
    entering: { [prop]: [from, to] },
    exiting: { [prop]: [to, from] }
  }
});

const aaOpacity = (): AnimatedSettings => aaProperty('opacity', 0, 1);

const aaVisibility = (): AnimatedSettings => {
  return {
    initialStyle: { opacity: 0 },
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

export { aaProperty, aaOpacity, aaVisibility };
