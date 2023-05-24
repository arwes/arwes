import { type ReactElement } from 'react';
import Link from 'next/link';
import {
  NavArrowRight,
  GitHub,
  Discord,
  Twitter,
  Heart
} from 'iconoir-react';
import { cx, Animator, Animated, BleepsOnAnimator, aaVisibility, useBleeps } from '@arwes/react';

import type { BleepNames } from '@app/types';
import { linkPrimary } from '@app/styles';
import { ModalLayout } from '@app/ui';
import { Modal } from '../Modal';
import { Version } from '../Version';
import * as classes from './ModalNavigate.css';

interface ModalNavigateProps {
  onClose: () => void
}

const ModalNavigate = (props: ModalNavigateProps): ReactElement => {
  const { onClose } = props;

  // TODO: Fix Animator timing calculation.

  const bleeps = useBleeps();

  const close = (): void => {
    onClose();
    bleeps.click?.play();
  };

  return (
    <Modal>
      <Animator>
        <BleepsOnAnimator<BleepNames>
          transitions={{ entering: 'open' }}
          continuous
        />
        <Animator unmountOnExited>
          <ModalLayout title='Navigate' onClose={close}>
            <div className={classes.links}>
              <Animator>
                <Animated className={classes.link} animated={aaVisibility()}>
                  <Link href='/docs' className={cx(linkPrimary, classes.linkAnchor, classes.surface)} onClick={close}>
                    Docs
                  </Link>
                  <div className={cx(linkPrimary, classes.linkOpen, classes.surface)}>
                    <NavArrowRight />
                  </div>
                </Animated>
              </Animator>
              <Animator>
                <Animated className={classes.link} animated={aaVisibility()}>
                  <Link href='/samples' className={cx(linkPrimary, classes.linkAnchor, classes.surface)} onClick={close}>
                    Samples
                  </Link>
                </Animated>
              </Animator>
              <Animator>
                <Animated className={classes.link} animated={aaVisibility()}>
                  <a href='/play' className={cx(linkPrimary, classes.linkAnchor, classes.surface)} onClick={close}>
                    Play
                  </a>
                </Animated>
              </Animator>
              <Animator>
                <Animated className={classes.link} animated={aaVisibility()}>
                  <a href='/perf' className={cx(linkPrimary, classes.linkAnchor, classes.surface)} onClick={close}>
                    Perf
                  </a>
                </Animated>
              </Animator>
            </div>

            <div className={classes.social}>
              <Animator>
                <Animated
                  as='a'
                  href='https://github.com/sponsors/romelperez'
                  target='donate'
                  className={cx(linkPrimary, classes.socialLink, classes.surface)}
                  animated={aaVisibility()}
                >
                  <Heart />
                  <span>Donate</span>
                </Animated>
              </Animator>
              <Animator>
                <Animated
                  as='a'
                  href='https://github.com/arwes/arwes'
                  target='github'
                  className={cx(linkPrimary, classes.socialLink, classes.surface)}
                  animated={aaVisibility()}
                >
                  <GitHub />
                  <span>GitHub</span>
                </Animated>
              </Animator>
              <Animator>
                <Animated
                  as='a'
                  href='https://discord.gg/s5sbTkw'
                  target='discord'
                  className={cx(linkPrimary, classes.socialLink, classes.surface)}
                  animated={aaVisibility()}
                >
                  <Discord />
                  <span>Discord</span>
                </Animated>
              </Animator>
              <Animator>
                <Animated
                  as='a'
                  href='https://twitter.com/arwesjs'
                  target='twitter'
                  className={cx(linkPrimary, classes.socialLink, classes.surface)}
                  animated={aaVisibility()}
                >
                  <Twitter />
                  <span>Twitter</span>
                </Animated>
              </Animator>
            </div>

            <Animator>
              <Version
                className={classes.version}
                prefix='Arwes '
                animated={aaVisibility()}
              />
            </Animator>
          </ModalLayout>
        </Animator>
      </Animator>
    </Modal>
  );
};

export type { ModalNavigateProps };
export { ModalNavigate };
