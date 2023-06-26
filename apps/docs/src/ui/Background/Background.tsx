import { type ReactElement } from 'react';
import { useRouter } from 'next/router';
import { type AnimatedProp, Animator, Animated, Dots, Puffs, aa, cx } from '@arwes/react';

import * as classes from './Background.css';

interface BackgroundProps {
  className?: string
  animated?: AnimatedProp
}

const Background = (props: BackgroundProps): ReactElement => {
  const { className, animated } = props;

  const router = useRouter();
  const isIndex = router.asPath === '/';

  return (
    <Animator merge combine>
      <Animated
        role='presentation'
        className={cx(classes.root, className)}
        animated={animated}
      >
        <Animator>
          <Animated
            as='picture'
            role='presentation'
            className={classes.layer1}
            style={{
              filter: `brightness(${isIndex ? 0.4 : 0.3}) blur(${isIndex ? 0 : 10}px)`
            }}
            animated={[aa('opacity', 0.8, 1), aa('scale', 1.05, 1)]}
          >
            <source media='(min-width:1280px)' srcSet='/assets/images/background-large.webp' type='image/webp' />
            <source media='(min-width:1280px)' srcSet='/assets/images/background-large.jpg' type='image/jpeg' />
            <source media='(min-width:768px)' srcSet='/assets/images/background-medium.webp' type='image/webp' />
            <source media='(min-width:768px)' srcSet='/assets/images/background-medium.jpg' type='image/jpeg' />
            <source media='(max-width:767px)' srcSet='/assets/images/background-small.webp' type='image/webp' />
            <img className={classes.layer1Image} src='/assets/images/background-small.jpg' alt='Background' />
          </Animated>
        </Animator>

        <Animator duration={{ enter: 2 }} unmountOnDisabled>
          <Dots
            className={classes.layer2}
            color='hsla(180, 29%, 72%, 0.15)'
            size={2}
            distance={40}
            originInverted
          />
        </Animator>

        <Animator duration={{ enter: 2, interval: 4 }} unmountOnDisabled>
          <Puffs
            className={classes.layer3}
            color='hsla(180, 29%, 72%, 0.25)'
            quantity={20}
          />
        </Animator>
      </Animated>
    </Animator>
  );
};

export type { BackgroundProps };
export { Background };
