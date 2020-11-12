import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { LiveProvider } from 'react-live';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';

import { theme } from '../../theme';
import { useSelectedPlayground } from 'playground/src/tools/useSelectedPlayground';
import { getSandboxFileCode } from 'playground/src/tools/getSandboxFileCode';
import { getPackagesScope } from 'playground/src/tools/getPackagesScope';
import { Header } from '../Header';
import { Controls } from '../Controls';
import { SandboxEditor } from '../SandboxEditor';
import { SandboxResult } from '../SandboxResult';
import { Footer } from '../Footer';

const getIsDeviceLarge = () => document.body.offsetWidth >= theme.breakpoints.tablet;

function Component ({ classes }) {
  const { sandboxConfig } = useSelectedPlayground();

  const [isCodeActive, setIsCodeActive] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isControlsActive, setIsControlsActive] = useState(getIsDeviceLarge);

  const onToggleCode = () => sandboxConfig && setIsCodeActive(!isCodeActive);
  const onTogglePreview = () => sandboxConfig && setIsPreviewActive(!isPreviewActive);
  const onToggleControls = () => setIsControlsActive(!isControlsActive);

  useEffect(() => {
    const onResize = () => setIsControlsActive(getIsDeviceLarge);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (sandboxConfig) {
      if (getIsDeviceLarge()) {
        setIsCodeActive(true);
        setIsPreviewActive(true);
      }
      else {
        setIsCodeActive(false);
        setIsPreviewActive(true);
      }
    }
    else {
      setIsCodeActive(false);
      setIsPreviewActive(false);
    }
  }, [sandboxConfig]);

  return (
    <div
      className={cx(
        classes.root,
        isCodeActive && isPreviewActive && classes.isMainTwoPanels
      )}
    >
      <Header
        isCodeActive={isCodeActive}
        isPreviewActive={isPreviewActive}
        isControlsActive={isControlsActive}
        onToggleCode={onToggleCode}
        onTogglePreview={onTogglePreview}
        onToggleControls={onToggleControls}
      />
      <div className={classes.content}>
        <Controls
          className={classes.controls}
          isHidden={!isControlsActive}
        />
        <main className={classes.main}>
          {!!sandboxConfig && (
            <LiveProvider
              code={getSandboxFileCode(sandboxConfig.code)}
              scope={getPackagesScope()}
              theme={prismThemeVSDark}
              disabled={!getIsDeviceLarge()}
              noInline
            >
              {isCodeActive && (
                <div className={cx(classes.panel, classes.editor)}>
                  <SandboxEditor />
                </div>
              )}
              {isPreviewActive && (
                <div className={classes.panel}>
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

export { Component };
