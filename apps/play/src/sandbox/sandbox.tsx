import React from 'react';
import ReactDOM from 'react-dom';
import * as emotionReact from '@emotion/react';
import * as motion from 'motion';
import * as empanada from 'empanada';
import { setupSandbox } from 'noxtron/build/sandbox';

import * as tools from '@arwes/tools';
import * as theme from '@arwes/theme';
import * as styles from '@arwes/styles';
import * as animator from '@arwes/animator';
import * as animated from '@arwes/animated';
import * as bleeps from '@arwes/bleeps';
import * as bgs from '@arwes/bgs';

setupSandbox({
  dependencies: [
    { name: 'react', pkg: React },
    { name: 'react-dom', pkg: ReactDOM },
    { name: '@emotion/react', pkg: emotionReact },
    { name: 'motion', pkg: motion },
    { name: 'empanada', pkg: empanada },
    { name: '@arwes/tools', pkg: tools },
    { name: '@arwes/theme', pkg: theme },
    { name: '@arwes/styles', pkg: styles },
    { name: '@arwes/animator', pkg: animator },
    { name: '@arwes/animated', pkg: animated },
    { name: '@arwes/bleeps', pkg: bleeps },
    { name: '@arwes/bgs', pkg: bgs }
  ]
});
