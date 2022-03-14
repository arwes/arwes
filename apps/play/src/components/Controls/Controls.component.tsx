/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

import { playConfigs } from '../../../playConfigs';
import { useRouterState } from '../../tools/useRouterState';
import { Button } from '../Button';
import { styles } from './Controls.styles';

interface ControlsProps {
  className?: string
}

const Controls = (props: ControlsProps): ReactElement => {
  const { className } = props;

  const [routerState] = useRouterState();

  return (
    <aside
      css={[styles.root, routerState.isControlsActive && styles.rootIsVisible]}
      className={className}
    >
      <div css={styles.container}>
        <div css={styles.content}>
          <header css={styles.header}>
            <h1 css={styles.title}>
              Controls
            </h1>
            <Button
              css={styles.buttonClose}
              onClick={() => routerState.toggleControls?.()}
            >
              Close
            </Button>
          </header>
          <div css={styles.body}>
            <div css={styles.packages}>
              {playConfigs.map((pkg, index) => (
                <div
                  key={index}
                  css={styles.package}
                >
                  <div css={styles.packageName}>
                    @arwes/{pkg.name}
                  </div>
                  <div css={styles.components}>
                    {pkg.components.map((component, index) =>
                      <div
                        key={index}
                        css={styles.component}
                      >
                        <div css={styles.componentName}>{component.name}</div>
                        <div css={styles.sandboxes}>
                          {component.sandboxes.map((sandbox, index) =>
                            <NavLink
                              key={index}
                              css={styles.sandboxLink}
                              activeStyle={styles.sandboxLinkActive as CSSProperties}
                              to={`/p/${pkg.name}/${component.name}/${sandbox.name}`}
                            >
                              {sandbox.name}
                            </NavLink>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export { Controls };
