import React from 'react';
import cx from 'classnames';

import { useSelectedPlayground } from 'playground/src/tools/useSelectedPlayground';
import { useRouterControls } from 'playground/src/tools/useRouterControls';
import { Select } from '../Select';

function Component ({ classes, className }) {
  const { controls, changeControl } = useRouterControls();
  const { packagesNames, componentsNames, sandboxesNames } = useSelectedPlayground();

  const onControlChange = name => event => changeControl(name, event.target.value);

  return (
    <aside className={cx(classes.root, className)}>

      <Select
        labelText='Package'
        value={controls.packageName}
        onChange={onControlChange('packageName')}
      >
        <option value=''>-- Select Package --</option>
        {packagesNames.map((packageName, index) => (
          <option key={index} value={packageName}>
            @arwes/{packageName}
          </option>
        ))}
      </Select>

      <Select
        labelText='Component'
        value={controls.componentName}
        onChange={onControlChange('componentName')}
      >
        <option value=''>-- Select Component --</option>
        {componentsNames.map((componentName, index) =>
          <option key={index} value={componentName}>
            {componentName}
          </option>
        )}
      </Select>

      <Select
        labelText='Sandbox'
        value={controls.sandboxName}
        onChange={onControlChange('sandboxName')}
      >
        <option value=''>-- Select Sandbox --</option>
        {sandboxesNames.map((sandboxName, index) =>
          <option key={index} value={sandboxName}>{sandboxName}</option>
        )}
      </Select>

    </aside>
  );
}

export { Component };
