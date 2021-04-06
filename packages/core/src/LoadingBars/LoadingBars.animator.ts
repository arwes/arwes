import { AnimatorClassSettings } from '@arwes/animation';

import {
  stopLoadingBarsTransition,
  startLoadingBarsTransition
} from './LoadingBars.effects';

const animator: AnimatorClassSettings = {
  onAnimateEntering: startLoadingBarsTransition,
  onAnimateExiting: startLoadingBarsTransition,
  onAnimateUnmount: stopLoadingBarsTransition
};

export { animator };
