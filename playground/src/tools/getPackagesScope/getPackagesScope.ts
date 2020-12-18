import anime from 'animejs';
import howler from 'howler';

import * as animation from '@arwes/animation';
import * as sounds from '@arwes/sounds';

type PackagesScope = Record<string, unknown>;

function getPackagesScope (): PackagesScope {
  return {
    anime,
    howler,
    ...animation,
    ...sounds
  };
}

export { PackagesScope, getPackagesScope };
