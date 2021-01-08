/** @jsx jsx */
import { jsx, Global } from '@emotion/react';
import { useState, useEffect } from 'react';
import { LiveProvider } from 'react-live';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';

import { useSelectedPlayground } from 'playground/src/tools/useSelectedPlayground';
import { getSandboxFileCode } from 'playground/src/tools/getSandboxFileCode';
import { getPackagesScope } from 'playground/src/tools/getPackagesScope';
import { theme } from '../../theme';
import { Header } from '../Header';
import { Controls } from '../Controls';
import { SandboxEditor } from '../SandboxEditor';
import { SandboxResult } from '../SandboxResult';
import { Footer } from '../Footer';
import { styles } from './App.styles';

function App () {
  const { sandboxConfig } = useSelectedPlayground();

  const getIsDeviceMobile = () => document.body.offsetWidth < theme.breakpoints.tablet;
  const getIsDeviceLarge = () => !getIsDeviceMobile();

  const [isCodeEnabled, setIsCodeEnabled] = useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
  const [isControlsEnabled, setIsControlsEnabled] = useState(getIsDeviceMobile);

  const [isCodeActive, setIsCodeActive] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isControlsActive, setIsControlsActive] = useState(getIsDeviceLarge);

  // If there is a sandbox available, there should be at least one of the panels
  // shown, either the code editor or the preview. Otherwise, both panels should
  // be disabled.

  const onToggleCode = () => {
    if (sandboxConfig) {
      if (isCodeActive) {
        setIsPreviewActive(true);
      }
      setIsCodeActive(!isCodeActive);
    }
  };
  const onTogglePreview = () => {
    if (sandboxConfig) {
      if (isPreviewActive) {
        setIsCodeActive(true);
      }
      setIsPreviewActive(!isPreviewActive);
    };
  };
  const onToggleControls = () => setIsControlsActive(!isControlsActive);

  useEffect(() => {
    const onResize = () => {
      setIsControlsEnabled(getIsDeviceMobile);
      setIsControlsActive(getIsDeviceLarge);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (sandboxConfig) {
      setIsCodeEnabled(true);
      setIsPreviewEnabled(true);

      if (getIsDeviceMobile()) {
        setIsCodeActive(false);
        setIsPreviewActive(true);
      }
      else {
        setIsCodeActive(true);
        setIsPreviewActive(true);
      }
    }
    else {
      setIsCodeEnabled(false);
      setIsPreviewEnabled(false);
    }
  }, [sandboxConfig]);

  return (
    <div css={styles.root}>
      <Global styles={styles.global} />
      <Header
        isCodeEnabled={isCodeEnabled}
        isPreviewEnabled={isPreviewEnabled}
        isControlsEnabled={isControlsEnabled}
        isCodeActive={isCodeActive}
        isPreviewActive={isPreviewActive}
        isControlsActive={isControlsActive}
        onToggleCode={onToggleCode}
        onTogglePreview={onTogglePreview}
        onToggleControls={onToggleControls}
      />
      <div css={styles.content}>
        <Controls
          css={styles.controls}
          isHidden={!isControlsActive}
          onToggleControls={onToggleControls}
        />
        <main css={[
          styles.main,
          isCodeActive && isPreviewActive && styles.isMainTwoPanels
        ]}>
          {!!sandboxConfig && (
            <LiveProvider
              code={getSandboxFileCode(sandboxConfig.code)}
              scope={getPackagesScope()}
              theme={prismThemeVSDark}
              disabled={!getIsDeviceLarge()}
              noInline
            >
              {isCodeActive && (
                <div css={[styles.panel, styles.editor, !isPreviewActive && styles.editorOnly]}>
                  <SandboxEditor />
                </div>
              )}
              {isPreviewActive && (
                <div css={[styles.panel, styles.preview]}>
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
