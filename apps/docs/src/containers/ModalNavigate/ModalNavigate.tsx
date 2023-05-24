import { type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { GitHub, Discord, Twitter, Heart } from 'iconoir-react';
import { cx, Animator, Animated, BleepsOnAnimator, aaVisibility, useBleeps, aa } from '@arwes/react';

import type { BleepNames } from '@app/types';
import { hiddenSMDown, linkPrimary } from '@app/styles';
import { ModalLayout } from '@app/ui';
import { Modal } from '../Modal';
import { Version } from '../Version';
import * as classes from './ModalNavigate.css';
import { NavLink } from './NavLink';

interface ModalContentProps {
  onClose: () => void
}

const ModalContent = (props: ModalContentProps): ReactElement => {
  const { onClose } = props;
  const { asPath: url } = useRouter();
  const bleeps = useBleeps();

  // TODO: Create configurable navigation items builder.
  // Currently, it only works with a defined set of items.
  const [nav, setNav] = useState(url.startsWith('/docs') ? '/docs' : '/');

  const close = (): void => {
    onClose();
    bleeps.click?.play();
  };

  return (
    <ModalLayout
      title='Navigate'
      footer={
        <>
          <Animator>
            <div className={classes.social}>
              <Animated
                as='a'
                href='https://github.com/sponsors/romelperez'
                target='donate'
                className={cx(linkPrimary, classes.surfacePrimary, classes.socialLink)}
                animated={[aa('y', '1rem', 0, 0)]}
              >
                <Heart />
                <span className={hiddenSMDown}>Donate</span>
              </Animated>
              <Animated
                as='a'
                href='https://github.com/arwes/arwes'
                target='github'
                className={cx(linkPrimary, classes.surfacePrimary, classes.socialLink)}
                animated={[aa('y', '1rem', 0, 0)]}
              >
                <GitHub />
                <span className={hiddenSMDown}>GitHub</span>
              </Animated>
              <Animated
                as='a'
                href='https://discord.gg/s5sbTkw'
                target='discord'
                className={cx(linkPrimary, classes.surfacePrimary, classes.socialLink)}
                animated={[aa('y', '1rem', 0, 0)]}
              >
                <Discord />
                <span className={hiddenSMDown}>Discord</span>
              </Animated>
              <Animated
                as='a'
                href='https://twitter.com/arwesjs'
                target='twitter'
                className={cx(linkPrimary, classes.surfacePrimary, classes.socialLink)}
                animated={[aa('y', '1rem', 0, 0)]}
              >
                <Twitter />
                <span className={hiddenSMDown}>Twitter</span>
              </Animated>
            </div>
          </Animator>

          <Animator>
            <Version
              className={classes.version}
              prefix='Arwes '
              animated={[aaVisibility(), aa('y', '1rem', 0)]}
            />
          </Animator>
        </>
      }
      onClose={close}
    >
      <Animator manager='switch' checkToSend={[nav]}>
        {/* TODO: Create configurable navigation items builder.
            Currently, it only works with a defined set of items. */}
        <div className={classes.links}>
          <Animator condition={() => nav === '/docs'} manager='stagger' unmountOnExited>
            <NavLink href='/docs' active={url === '/docs'} animated={aa('x', '1rem', 0)} onClose={close} onLeft={() => setNav('/')}>
              Docs
            </NavLink>
            <NavLink href='/docs/develop' active={url.startsWith('/docs/develop')} animated={aa('x', '1rem', 0)} onClose={close}>
              Develop
            </NavLink>
            <NavLink href='/docs/design' active={url.startsWith('/docs/design')} animated={aa('x', '1rem', 0)} onClose={close}>
              Design
            </NavLink>
            <NavLink href='/docs/community' active={url.startsWith('/docs/community')} animated={aa('x', '1rem', 0)} onClose={close}>
              Community
            </NavLink>
          </Animator>
          <Animator condition={() => nav !== '/docs'} manager='stagger' unmountOnExited>
            <NavLink href='/docs' active={url.startsWith('/docs')} animated={aa('x', '-1rem', 0)} onClose={close} onRight={() => setNav('/docs')}>
              Docs
            </NavLink>
            <NavLink href='/samples' active={url.startsWith('/samples')} animated={aa('x', '-1rem', 0)} onClose={close}>
              Samples
            </NavLink>
            <NavLink href='/play' active={url.startsWith('/play')} animated={aa('x', '-1rem', 0)} onClose={close}>
              Play
            </NavLink>
            <NavLink href='/perf' active={url.startsWith('/perf')} animated={aa('x', '-1rem', 0)} onClose={close}>
              Perf
            </NavLink>
          </Animator>
        </div>
      </Animator>
    </ModalLayout>
  );
};

interface ModalNavigateProps {
  onClose: () => void
}

const ModalNavigate = (props: ModalNavigateProps): ReactElement => {
  const { onClose } = props;

  // TODO: Fix Animator timing calculation.

  return (
    <Modal>
      <Animator merge>
        <BleepsOnAnimator<BleepNames>
          transitions={{ entering: 'open' }}
          continuous
        />
        <Animator merge unmountOnExited>
          <ModalContent onClose={onClose} />
        </Animator>
      </Animator>
    </Modal>
  );
};

export type { ModalNavigateProps };
export { ModalNavigate };
