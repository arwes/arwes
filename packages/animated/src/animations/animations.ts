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
          [element, { opacity: [1, 0.6] }],
          [element, { opacity: [0.6, 1] }]
        ],
        { duration }
      ),
      exiting: ({ element, duration }) => timeline(
        [
          [element, { opacity: [1, 0] }],
          [element, { opacity: [0, 0.4] }],
          [element, { opacity: [0.4, 0] }]
        ],
        { duration }
      )
    }
  };
};

export { aaProperty, aaOpacity, aaVisibility };
