import anime from 'animejs';
import { Howl } from 'howler';

import * as animation from 'repository/packages/animation';
import * as sounds from 'repository/packages/sounds';

function getPackagesScope () {
  return {
    anime,
    Howl,
    ...animation,
    ...sounds
  };
}

export { getPackagesScope };
