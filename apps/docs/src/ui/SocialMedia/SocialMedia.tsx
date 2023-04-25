import { type ReactElement } from 'react';
import {
  type AnimatedProp,
  Animated,
  cx
} from '@arwes/react';

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
      <li>
        <a href='https://github.com/arwes/arwes' target='github'>
          GitHub
        </a>
      </li>
      <li>
        <a href='https://discord.gg/s5sbTkw' target='discord'>
          Discord
        </a>
      </li>
      <li>
        <a href='https://twitter.com/arwesjs' target='twitter'>
          Twitter
        </a>
      </li>
    </Animated>
  );
};

export type { SocialMediaProps };
export { SocialMedia };
