import React from 'react';
import clsx from 'clsx';

import lernaSettings from 'repository/lerna.json';

function Component ({ classes, className }) {
  return (
    <footer className={clsx(classes.root, className)}>
      <div>
        <a href='https://github.com/arwes' target='github' rel='noreferrer'>
          v{lernaSettings.version}
        </a>
      </div>
      <div>
        <a href='https://discord.gg/s5sbTkw' target='discord' rel='noreferrer'>Discord</a>
        <a href='https://twitter.com/arwesjs' target='twitter' rel='noreferrer'>Twitter</a>
        <a href='https://github.com/arwes' target='github' rel='noreferrer'>GitHub</a>
      </div>
    </footer>
  );
}

export { Component };
