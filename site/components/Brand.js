import React from 'react';
import cx from 'classnames';

import withStyles from '../../src/tools/withStyles';
import Logo from '../../src/Logo';
import Words from '../../src/Words';

import Link from './Link';

const styles = theme => ({
  root: {
    display: 'inline-block',
    textAlign: 'left',
    '& h1': {
      display: 'inline-block',
      margin: [5, 0, 0, theme.padding / 2],
      verticalAlign: 'top',
    }
  },
});

function Brand (props) {
  const { theme, classes, show, onLink, className, ...etc } = props;
  const cls = cx(classes.root, className);
  return (
    <Link href='/' onLink={onLink} className={cls} {...etc}>
      <Logo
        animate
        show={show}
        size={45}
        layer='header'
      />
      <h1>
        <Words animate show={show}>
          Arwes
        </Words>
      </h1>
    </Link>
  );
}

export default withStyles(styles)(Brand);
