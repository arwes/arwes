import { useEffect, useState, type ReactElement } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';
import lernaSettings from '@repository/lerna.json';

import * as classes from './Version.css';

interface VersionProps {
  className?: string
  animated?: AnimatedProp
}

const Version = (props: VersionProps): ReactElement => {
  const { className, animated } = props;

  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setIsNext(/(next|localhost|127|198|0\.0\.0\.0\.)/.test(window.location.host));
  }, []);

  return (
    <Animated
      as='a'
      className={cx(classes.root, className)}
      animated={animated}
      href={
        isNext
          ? 'https://github.com/arwes/arwes/tree/next'
          : `https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`
      }
      target='github'
      title='Current Project Version'
    >
      {isNext ? 'Next Version' : `v${lernaSettings.version}`}
    </Animated>
  );
};

export type { VersionProps };
export { Version };
