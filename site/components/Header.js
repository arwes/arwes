import React from 'react';
import cx from 'classnames';

import withStyles from '../../src/tools/withStyles';
import ArwesHeader from '../../src/Header';
import Logo from '../../src/Logo';
import Words from '../../src/Words';
import Highlight from '../../src/Highlight';
import { Row, Col } from '../../src/Grid';

import Wrap from './Wrap';
import Link from './Link';

const styles = theme => ({
  root: {
    textAlign: 'center',

    '& h1': {
      display: 'inline-block',
      margin: [5, 0, 0, theme.padding / 2],
      verticalAlign: 'top',
    },
  },
  wrap: {
    padding: [theme.padding, 0],
  },
  links: {
    marginTop: theme.padding / 2,
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
    textAlign: 'left',
  },

  [`@media (min-width: ${theme.responsive.small + 1}px)`]: {
    root: {
      textAlign: 'left',
    },
    links: {
      marginTop: 0,
      textAlign: 'right',
    },
  },
});

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

const Header = props => {
  const {
    onLink,
    title,
    classes,
    className,
    ...etc
  } = props;

  const cls = cx(classes.root, className);

  return (
    <ArwesHeader
      className={cls}
      {...etc}
    >
      {anim => (
      <Wrap className={classes.wrap}>
        <Row noMargin>

          <Col s={12} m={6}>
            <Link href='/' onLink={onLink}>
              <Logo
                animate
                show={anim.entered}
                size={45}
                layer='header'
              />
              <h1>
                <Words animate show={anim.entered}>
                  {title}
                </Words>
              </h1>
            </Link>
          </Col>

          <Col s={12} m={6} className={classes.links}>
            {linksList.map((linkItem, index) => (
            <Link
              key={index}
              className={cx(classes.link, 'anim', anim.entered && 'animEntered')}
              href={linkItem.href}
              onLink={onLink}
            >
              <Highlight className={classes.button} animate layer='header'>
                <i className={`mdi mdi-${linkItem.icon}`}></i>
                <Words animate show={anim.entered}>{linkItem.name}</Words>
              </Highlight>
            </Link>
            ))}
          </Col>

        </Row>
      </Wrap>
      )}
    </ArwesHeader>
  );
};

export default withStyles(styles)(Header);
