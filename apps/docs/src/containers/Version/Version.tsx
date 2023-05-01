import { useEffect, useState, type ReactElement } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';
import lernaSettings from '@repository/lerna.json';

import { DEPLOY_TIME } from '@app/dynamics';
import { transition } from '@app/styles/motion.css';
import * as classes from './Version.css';

interface VersionProps {
  className?: string
  animated?: AnimatedProp
}

const Version = (props: VersionProps): ReactElement => {
  const { className, animated } = props;

  const [isNext, setIsNext] = useState(false);
  const date = new Date(DEPLOY_TIME);

  useEffect(() => {
    setIsNext(window.location.host !== 'arwes.dev');
  }, []);

  return (
    <Animated
      as='a'
      className={cx(classes.root, transition, className)}
      animated={animated}
      href={
        isNext
          ? 'https://github.com/arwes/arwes/tree/next'
          : `https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`
      }
      target='github'
      title={`Version ${isNext ? '@next' : lernaSettings.version} deployed at ${date.toUTCString()}`}
    >
      {isNext ? 'v@next' : `v${lernaSettings.version}`}
    </Animated>
  );
};

export type { VersionProps };
export { Version };
