import type { AnimatedSettings } from '../types';

const aaProperty = (prop: string, from: number | string, to: number | string): AnimatedSettings => ({
  initialStyle: { [prop]: from },
  transitions: {
    entering: { [prop]: [from, to] },
    exiting: { [prop]: [to, from] }
  }
});

const aaOpacity = (): AnimatedSettings => aaProperty('opacity', 0, 1);

export { aaProperty, aaOpacity };
