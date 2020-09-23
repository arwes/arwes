/* eslint-disable react/prop-types */

import React from 'react';

function Component ({ classes, useRouterControls, playgrounds }) {
  const { controls, onControlChange } = useRouterControls();

  const packagesNames = playgrounds.map(playground => playground.packageName);
  const packageConfig = playgrounds.find(playground => playground.packageName === controls.packageName);

  let componentsNames;
  let componentConfig;
  if (packageConfig) {
    const { components } = packageConfig;
    componentsNames = components.map(component => component.componentName);
    componentConfig = components.find(component => component.componentName === controls.componentName);
  }

  let sandboxesNames;
  let sandboxConfig;
  if (componentConfig) {
    const { sandboxes } = componentConfig.playground;
    sandboxesNames = sandboxes.map(sandbox => sandbox.name);
    sandboxConfig = sandboxes.find(sandbox => sandbox.name === controls.sandboxName);
  }

  return (
    <div className={classes.root}>

      <header className={classes.header}>
        <a className={classes.headerHeading} href='/'>
          <img className={classes.headerLogo} src='icon.png' />
          <h1 className={classes.headerTitle}>Arwes Playground</h1>
        </a>
      </header>

      <div className={classes.body}>
        <aside className={classes.controls}>

          {/* PACKAGE NAME */}
          <select
            className={classes.select}
            value={controls.packageName}
            onChange={event => onControlChange('packageName', event.target.value)}
          >
            <option value=''>-- Select Package --</option>
            {packagesNames.map((packageName, index) => (
              <option key={index} value={packageName}>
                @arwes/{packageName}
              </option>
            ))}
          </select>

          {/* COMPONENT NAME */}
          <select
            className={classes.select}
            value={controls.componentName}
            onChange={event => onControlChange('componentName', event.target.value)}
          >
            <option value=''>-- Select Component --</option>
            {!!componentsNames && componentsNames.map((componentName, index) =>
              <option key={index} value={componentName}>
                {componentName}
              </option>
            )}
          </select>

          {/* SANDBOX NAME */}
          <select
            className={classes.select}
            value={controls.sandboxName}
            onChange={event => onControlChange('sandboxName', event.target.value)}
          >
            <option value=''>-- Select Sandbox --</option>
            {!!sandboxesNames && sandboxesNames.map((sandboxName, index) =>
              <option key={index} value={sandboxName}>{sandboxName}</option>
            )}
          </select>

        </aside>

        <main className={classes.content}>
          {!!sandboxConfig && sandboxConfig.render()}
        </main>
      </div>

    </div>
  );
};

export { Component };
