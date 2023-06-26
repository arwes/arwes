import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import * as emotionReact from '@emotion/react';
import * as motion from 'motion';
import * as empanada from 'empanada';

// Vanilla
import * as tools from '@arwes/tools';
import * as theme from '@arwes/theme';
import * as animator from '@arwes/animator';
import * as animated from '@arwes/animated';
import * as bleeps from '@arwes/bleeps';
import * as text from '@arwes/text';
import * as frames from '@arwes/frames';
import * as bgs from '@arwes/bgs';
import * as core from '@arwes/core';
import * as arwes from 'arwes';

// React
import * as reactTools from '@arwes/react-tools';
import * as reactStyles from '@arwes/react-styles';
import * as reactAnimator from '@arwes/react-animator';
import * as reactAnimated from '@arwes/react-animated';
import * as reactBleeps from '@arwes/react-bleeps';
import * as reactText from '@arwes/react-text';
import * as reactBgs from '@arwes/react-bgs';
import * as reactFrames from '@arwes/react-frames';
import * as reactCore from '@arwes/react-core';
import * as arwesReact from '@arwes/react';

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
    { name: '@arwes/text', pkg: text },
    { name: '@arwes/frames', pkg: frames },
    { name: '@arwes/bgs', pkg: bgs },
    { name: '@arwes/core', pkg: core },
    { name: 'arwes', pkg: arwes },
    { name: '@arwes/react-tools', pkg: reactTools },
    { name: '@arwes/react-styles', pkg: reactStyles },
    { name: '@arwes/react-animator', pkg: reactAnimator },
    { name: '@arwes/react-animated', pkg: reactAnimated },
    { name: '@arwes/react-bleeps', pkg: reactBleeps },
    { name: '@arwes/react-text', pkg: reactText },
    { name: '@arwes/react-bgs', pkg: reactBgs },
    { name: '@arwes/react-frames', pkg: reactFrames },
    { name: '@arwes/react-core', pkg: reactCore },
    { name: '@arwes/react', pkg: arwesReact }
  ]
}));
