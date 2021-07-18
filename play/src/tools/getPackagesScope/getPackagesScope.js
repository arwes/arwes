import * as emotion from '@emotion/react';
import anime from 'animejs';
import howler from 'howler';

import * as tools from '@repository/packages/tools';
import * as design from '@repository/packages/design';
import * as animator from '@repository/packages/animator';
import * as animated from '@repository/packages/animated';
import * as bleeps from '@repository/packages/bleeps';
import * as core from '@repository/packages/core';
import * as arwes from '@repository/packages/arwes';

import { generateRandomText } from '../generateRandomText';

function getPackagesScope () {
  return {
    _generateRandomText: generateRandomText,
    emotion,
    anime,
    howler,
    ...tools,
    ...design,
    ...animator,
    ...animated,
    ...bleeps,
    ...core,
    ...arwes
  };
}

export { getPackagesScope };
