import React from 'react';
import cx from 'classnames';
import { LiveProvider } from 'react-live';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';

import { useSelectedPlayground } from 'playground/src/tools/useSelectedPlayground';
import { getSandboxFileCode } from 'playground/src/tools/getSandboxFileCode';
import { getPackagesScope } from 'playground/src/tools/getPackagesScope';
import { Header } from '../Header';
import { Controls } from '../Controls';
import { SandboxEditor } from '../SandboxEditor';
import { SandboxResult } from '../SandboxResult';
import { Footer } from '../Footer';

function Component ({ classes }) {
  const { sandboxConfig } = useSelectedPlayground();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <Controls className={classes.controls} />
        <main className={classes.main}>
          {!!sandboxConfig && (
            <LiveProvider
              code={getSandboxFileCode(sandboxConfig.code)}
              scope={getPackagesScope()}
              theme={prismThemeVSDark}
              noInline
            >
              <div className={cx(classes.panel, classes.editor)}>
                <SandboxEditor />
              </div>
              <div className={classes.panel}>
                <SandboxResult />
              </div>
            </LiveProvider>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export { Component };
