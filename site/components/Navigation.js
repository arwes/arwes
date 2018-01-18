import React from 'react';
import cx from 'classnames';

import withStyles from '../../src/tools/withStyles';
import Words from '../../src/Words';
import Highlight from '../../src/Highlight';
import Appear from '../../src/Appear';

import Link from './Link';

const linksList = [{
  name: 'Docs',
  icon: 'note-outline',
  href: '/docs'
}, {
  name: 'API',
  icon: 'code-brackets',
  href: '/api'
}, {
  name: 'Play',
  icon: 'beaker',
  href: '/play'
}];

const styles = theme => ({
  root: {
    display: 'inline-block',
    textAlign: 'left',
  },
  link: {
    display: 'inline-block',
    lineHeight: '45px',
    fontSize: 21,
    '& i': {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  button: {
    padding: [0, theme.padding / 2],
  },
});

function Navigation (props) {
  const { theme, classes, show, onLink, className, ...etc } = props;
  const cls = cx(classes.root, className);

  return (
    <nav className={cls} {...etc}>
      {linksList.map((linkItem, index) => (
      <Link
        key={index}
        className={classes.link}
        href={linkItem.href}
        onLink={onLink}
      >
        <Highlight className={classes.button} animate layer='header'>
          <Appear className={`mdi mdi-${linkItem.icon}`} animate show={show} />
          {' '}
          <Words animate show={show}>{linkItem.name}</Words>
        </Highlight>
      </Link>
      ))}
    </nav>
  );
}

export default withStyles(styles)(Navigation);
