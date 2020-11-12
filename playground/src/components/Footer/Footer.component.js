import React from 'react';
import cx from 'classnames';

import lernaSettings from 'repository/lerna.json';

function Component ({ classes, className }) {
  return (
    <footer className={cx(classes.root, className)}>
      <div>
        <a href='https://arwes.dev' target='_blank' rel='noreferrer'>
          Arwes v{lernaSettings.version}
        </a>
      </div>
      <div>
        <a href='https://github.com/arwes/arwes' target='_blank' rel='noreferrer'>
          GitHub
        </a>
        {' / '}
        <a href='https://twitter.com/arwesjs' target='_blank' rel='noreferrer'>
          Twitter
        </a>
      </div>
    </footer>
  );
}

export { Component };
