import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import * as emotionReact from '@emotion/react';
import * as motion from 'motion';
import * as empanada from 'empanada';

import * as tools from '@arwes/tools';
import * as theme from '@arwes/theme';
import * as animator from '@arwes/animator';
import * as animated from '@arwes/animated';
import * as bleeps from '@arwes/bleeps';
import * as bgs from '@arwes/bgs';
import * as reactTools from '@arwes/react-tools';
import * as reactTheme from '@arwes/react-theme';
import * as reactStyles from '@arwes/react-styles';
import * as reactAnimator from '@arwes/react-animator';
import * as reactAnimated from '@arwes/react-animated';
import * as reactBleeps from '@arwes/react-bleeps';
import * as reactBgs from '@arwes/react-bgs';

window.noxtron.setupSandbox(() => ({
  dependencies: [
    { name: 'react', pkg: React },
    { name: 'react-dom', pkg: ReactDOM },
    { name: 'react-dom/client', pkg: ReactDOMClient },
    { name: '@emotion/react', pkg: emotionReact },
    { name: 'motion', pkg: motion },
    { name: 'empanada', pkg: empanada },
    { name: '@arwes/tools', pkg: tools },
    { name: '@arwes/theme', pkg: theme },
    { name: '@arwes/animator', pkg: animator },
    { name: '@arwes/animated', pkg: animated },
    { name: '@arwes/bleeps', pkg: bleeps },
    { name: '@arwes/bgs', pkg: bgs },
    { name: '@arwes/react-tools', pkg: reactTools },
    { name: '@arwes/react-theme', pkg: reactTheme },
    { name: '@arwes/react-styles', pkg: reactStyles },
    { name: '@arwes/react-animator', pkg: reactAnimator },
    { name: '@arwes/react-animated', pkg: reactAnimated },
    { name: '@arwes/react-bleeps', pkg: reactBleeps },
    { name: '@arwes/react-bgs', pkg: reactBgs }
  ]
}));
