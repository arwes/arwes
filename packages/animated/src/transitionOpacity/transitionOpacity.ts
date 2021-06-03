import { AnimatedSettings } from '../constants';

const transitionOpacity: AnimatedSettings = {
  initialStyles: { opacity: 0 },
  entering: { opacity: 1 },
  exiting: { opacity: 0 }
};

export { transitionOpacity };
