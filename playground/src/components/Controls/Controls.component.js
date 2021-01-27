/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useRef, useEffect } from 'react';
import anime from 'animejs';

import { useSelectedPlayground } from 'playground/src/tools/useSelectedPlayground';
import { useRouterControls } from 'playground/src/tools/useRouterControls';
import { Select } from '../Select';
import { Button } from '../Button';
import { styles } from './Controls.styles';

function Controls ({ className, isHidden, onToggleControls }) {
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
      css={styles.root}
      className={className}
    >
      <div css={styles.content}>
        <div css={styles.options}>
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
        </div>
        <div css={styles.guide}>
          <div css={styles.guideTitle}>Guide</div>
          <p>
            Each sandbox source code should call a function <code>render()</code>{' '}
            with the sandbox component to render.
          </p>
          <p>Available global modules to use in the sandbox code:</p>
          <ul>
            <li>
              <a href='https://reactjs.org' target='_blank' rel='noreferrer'><code>React</code></a>.
            </li>
            <li>
              <a href='https://emotion.sh/docs/@emotion/react' target='_blank' rel='noreferrer'><code>emotion</code></a>.
            </li>
            <li>
              <a href='https://animejs.com' target='_blank' rel='noreferrer'><code>anime</code></a>.
            </li>
            <li>
              <a href='https://howlerjs.com' target='_blank' rel='noreferrer'><code>howler</code></a>.
            </li>
            <li>
              All Arwes packages exported modules.
            </li>
          </ul>
          <p>Available Google Fonts:</p>
          <ul>
            <li><a href='https://fonts.google.com/specimen/Titillium+Web' target='_blank' rel='noreferrer'>Titillium Web</a>.</li>
            <li><a href='https://fonts.google.com/specimen/Source+Code+Pro' target='_blank' rel='noreferrer'>Source Code Pro</a>.</li>
            <li><a href='https://material.io/resources/icons' target='_blank' rel='noreferrer'>Material Design Icons</a>.</li>
          </ul>
          <p>
            The playground pollutes globally the sandbox preview components with a few
            global styles:
          </p>
          <ul>
            <li>Elements with <code>box-sizing: border-box</code>.</li>
            <li>The <code>::selection</code> styles.</li>
            <li>The scrollbars styles.</li>
          </ul>
        </div>
        <div css={styles.buttons}>
          <Button onClick={onToggleControls}>OK</Button>
        </div>
      </div>
    </aside>
  );
}

export { Controls };
