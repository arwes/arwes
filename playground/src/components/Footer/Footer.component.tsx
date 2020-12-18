import React, { FC } from 'react';
import cx from 'clsx';
import { Classes } from 'jss';

import lernaSettings from '../../../../lerna.json';

interface FooterProps {
  classes: Classes
  className?: string
}

const Footer: FC<FooterProps> = ({ classes, className }) => {
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
};

export { FooterProps, Footer };
