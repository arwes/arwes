import React, { useRef, useEffect } from 'react';
import cx from 'classnames';
import anime from 'animejs';

import { useSelectedPlayground } from 'playground/src/tools/useSelectedPlayground';
import { useRouterControls } from 'playground/src/tools/useRouterControls';
import { Select } from '../Select';

function Component ({ classes, className, isHidden }) {
  const rootRef = useRef();
  const isFirstRender = useRef(true);
  const { controls, changeControl } = useRouterControls();
  const { packagesNames, componentsNames, sandboxesNames } = useSelectedPlayground();

  const onControlChange = name => event => changeControl(name, event.target.value);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // Initial animation state.
      if (isHidden) {
        anime.set(rootRef.current, { display: 'none', opacity: 0 });
      }
      else {
        anime.set(rootRef.current, { display: 'block', opacity: 1 });
      }

      return;
    }

    if (isHidden) {
      anime({
        targets: rootRef.current,
        duration: 150,
        easing: 'easeOutSine',
        opacity: [1, 0],
        complete: () => anime.set(rootRef.current, { display: 'none' })
      });
    }
    else {
      anime.set(rootRef.current, { display: 'block' });
      anime({
        targets: rootRef.current,
        duration: 150,
        easing: 'easeOutSine',
        opacity: [0, 1]
      });
    }
  }, [isHidden]);

  return (
    <aside
      ref={rootRef}
      className={cx(classes.root, className)}
    >
      <Select
        labelText='Package'
        value={controls.packageName}
        onChange={onControlChange('packageName')}
      >
        {packagesNames.map((packageName, index) => (
          <option key={index} value={packageName}>@arwes/{packageName}</option>
        ))}
      </Select>
      <Select
        labelText='Component'
        value={controls.componentName}
        onChange={onControlChange('componentName')}
      >
        {componentsNames.map((componentName, index) =>
          <option key={index} value={componentName}>{componentName}</option>
        )}
      </Select>
      <Select
        labelText='Sandbox'
        value={controls.sandboxName}
        onChange={onControlChange('sandboxName')}
      >
        {sandboxesNames.map((sandboxName, index) =>
          <option key={index} value={sandboxName}>{sandboxName}</option>
        )}
      </Select>
    </aside>
  );
}

export { Component };
