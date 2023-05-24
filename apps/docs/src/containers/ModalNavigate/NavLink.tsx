import { type ReactElement, type ReactNode } from 'react';
import Link from 'next/link';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import { type AnimatedSettings, cx, Animator, Animated, aaOpacity, useBleeps } from '@arwes/react';

import { linkPrimary, linkSecondary } from '@app/styles';
import * as classes from './ModalNavigate.css';

interface NavLinkProps {
  href: string
  active?: boolean
  children: ReactNode
  animated?: AnimatedSettings
  onClose?: () => void
  onLeft?: () => void
  onRight?: () => void
}

const NavLink = (props: NavLinkProps): ReactElement => {
  const { href, active, children, animated, onClose, onLeft, onRight } = props;

  const bleeps = useBleeps();

  return (
    <Animator>
      <Animated className={classes.link} animated={[aaOpacity(), animated]}>
        {!!onLeft && (
          <button
            className={cx(linkPrimary, classes.linkButton, classes.linkButtonLeft, classes.surfacePrimary)}
            onClick={() => {
              onLeft();
              bleeps.click?.play();
            }}
          >
            <NavArrowLeft />
          </button>
        )}

        <Link
          href={href}
          className={cx(
            active
              ? cx(linkSecondary, classes.surfaceSecondary)
              : cx(linkPrimary, classes.surfacePrimary),
            classes.linkAnchor
          )}
          onClick={onClose}
        >
          {children}
        </Link>

        {!!onRight && (
          <button
            className={cx(linkPrimary, classes.linkButton, classes.linkButtonRight, classes.surfacePrimary)}
            onClick={() => {
              onRight();
              bleeps.click?.play();
            }}
          >
            <NavArrowRight />
          </button>
        )}
      </Animated>
    </Animator>
  );
};

export type { NavLinkProps };
export { NavLink };
