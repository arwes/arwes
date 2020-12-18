import anime from 'animejs';
import howler from 'howler';

import * as animation from 'repository/packages/animation';
import * as sounds from 'repository/packages/sounds';

function getPackagesScope () {
  return {
    anime,
    howler,
    ...animation,
    ...sounds
  };
}

export { getPackagesScope };
