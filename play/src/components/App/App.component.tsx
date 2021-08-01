/** @jsx jsx */
import { jsx, Global } from '@emotion/react';
import { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LiveProvider } from 'react-live';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';

import { GA_TRACKING_ID } from '../../settings';
import { useRouterState } from '../../tools/useRouterState';
import { getSandboxFileCode } from '../../tools/getSandboxFileCode';
import { getPackagesScope } from '../../tools/getPackagesScope';
import { getDesktopMediaQueryList } from '../../tools/getDesktopMediaQueryList';
import { Header } from '../Header';
import { Controls } from '../Controls';
import { SandboxEditor } from '../SandboxEditor';
import { SandboxResult } from '../SandboxResult';
import { Footer } from '../Footer';
import { styles } from './App.styles';

const App = (): ReactElement => {
  const location = useLocation();
  const [routerState] = useRouterState();

  const isTwoPanels = routerState.isEditorActive && routerState.isPreviewActive;

  useEffect(() => {
    // Google Analytics page tracking.
    const win: any = window;
    win.gtag?.('config', GA_TRACKING_ID, { page_path: location.pathname });
  }, [location.pathname, location.search]);

  return (
    <div css={styles.root}>
      <Global styles={styles.global} />
      <Header />
      <div css={styles.content}>
        <Controls css={styles.controls} />
        <main css={styles.main}>
          {!!routerState.sandboxConfig && (
            <LiveProvider
              code={getSandboxFileCode(routerState.sandboxConfig.code)}
              scope={getPackagesScope()}
              theme={prismThemeVSDark}
              disabled={!getDesktopMediaQueryList().matches}
              noInline
            >
              {routerState.isEditorActive && (
                <div css={[
                  styles.panel,
                  styles.editor,
                  !routerState.isPreviewActive && styles.editorOnly,
                  isTwoPanels && styles.isPanelHalf
                ]}>
                  <SandboxEditor />
                </div>
              )}
              {routerState.isPreviewActive && (
                <div css={[
                  styles.panel,
                  styles.preview,
                  isTwoPanels && styles.isPanelHalf
                ]}>
                  <SandboxResult />
                </div>
              )}
            </LiveProvider>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export { App };
