import * as emotion from '@emotion/react';
import anime from 'animejs';
import howler from 'howler';

import * as tools from 'repository/packages/tools';
import * as design from 'repository/packages/design';
import * as animation from 'repository/packages/animation';
import * as sounds from 'repository/packages/sounds';
import * as core from 'repository/packages/core';
import * as arwes from 'repository/packages/arwes';

import { generateRandomText } from '../generateRandomText';

function getPackagesScope () {
  return {
    _generateRandomText: generateRandomText,
    emotion,
    anime,
    howler,
    ...tools,
    ...design,
    ...animation,
    ...sounds,
    ...core,
    ...arwes
  };
}

export { getPackagesScope };
