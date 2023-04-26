import { type ReactElement } from 'react';
import { GitHub, Discord, Twitter } from 'iconoir-react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './SocialMedia.css';

interface SocialMediaProps {
  className?: string
  animated?: AnimatedProp
}

const SocialMedia = (props: SocialMediaProps): ReactElement => {
  const { className, animated } = props;

  return (
    <Animated
      as='ul'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <li className={classes.item}>
        <a className={classes.link} href='https://github.com/arwes/arwes' target='github' title='GitHub'>
          <GitHub />
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href='https://discord.gg/s5sbTkw' target='discord' title='Discord'>
          <Discord />
        </a>
      </li>
      <li className={classes.item}>
        <a className={classes.link} href='https://twitter.com/arwesjs' target='twitter' title='Twitter'>
          <Twitter />
        </a>
      </li>
    </Animated>
  );
};

export type { SocialMediaProps };
export { SocialMedia };
