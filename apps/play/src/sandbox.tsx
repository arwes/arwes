import * as emotionReact from '@emotion/react';
import * as motion from 'motion';
import { setupSandbox } from 'noxtron/build/cjs/apps/sandbox';

import * as animator from '@arwes/animator';
import * as animated from '@arwes/animated';

setupSandbox({
  dependencies: [
    { name: '@emotion/react', pkg: emotionReact },
    { name: 'motion', pkg: motion },
    { name: '@arwes/animator', pkg: animator },
    { name: '@arwes/animated', pkg: animated }
  ]
});
