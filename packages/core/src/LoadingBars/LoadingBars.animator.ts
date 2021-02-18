import { AnimatorClassSettings } from '@arwes/animation';

import {
  stopLoadingBarsTransition,
  startLoadingBarsTransition
} from './LoadingBars.effects';

const animator: AnimatorClassSettings = {
  useAnimateEntering: startLoadingBarsTransition,
  useAnimateExiting: startLoadingBarsTransition,
  useAnimateUnmount: stopLoadingBarsTransition
};

export { animator };
