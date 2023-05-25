import { useEffect, useState, type ReactElement } from 'react';
import { type AnimatedProp, Animated, cx, useBleeps } from '@arwes/react';
import lernaSettings from '@repository/lerna.json';

import { DEPLOY_TIME } from '@app/dynamics';
import type { BleepNames } from '@app/types';
import { transition, linkPrimary } from '@app/styles';
import * as classes from './Version.css';

interface VersionProps {
  className?: string
  animated?: AnimatedProp
  prefix?: string
  sufix?: string
}

const Version = (props: VersionProps): ReactElement => {
  const { className, animated, prefix, sufix } = props;

  const bleeps = useBleeps<BleepNames>();
  const [isNext, setIsNext] = useState(false);
  const date = new Date(DEPLOY_TIME);

  useEffect(() => {
    setIsNext(window.location.host !== 'arwes.dev');
  }, []);

  return (
    <Animated
      as='a'
      className={cx(classes.root, transition, linkPrimary, className)}
      animated={animated}
      href={
        isNext
          ? 'https://github.com/arwes/arwes/tree/next'
          : `https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`
      }
      target='github'
      title={`Version ${isNext ? '@next' : lernaSettings.version} deployed at ${date.toUTCString()}`}
      onClick={() => bleeps.click?.play()}
    >
      {prefix}{isNext ? 'v@next' : `v${lernaSettings.version}`}{sufix}
    </Animated>
  );
};

export type { VersionProps };
export { Version };
