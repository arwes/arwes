/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import settings from '../../settings';

const styles = {
  root: theme => ({
    display: 'block',

    '& a': {
      fontSize: 12
    },
    '& a + a': {
      marginLeft: 10
    },

    [theme.breakpoints.tabletUp]: {
      '& a': {
        fontSize: 16
      }
    }
  })
};

const DesktopNavPrimary = ({ className }) => (
  <nav className={className} css={styles.root}>
    {settings.hierarchy.map(({ name, path }) =>
      <Link key={name} to={`/${path}`}>{name}</Link>
    )}
    <a href='https://playground.arwes.dev' target='playground'>Playground</a>
  </nav>
);

DesktopNavPrimary.propTypes = {
  className: PropTypes.string
};

export { DesktopNavPrimary };
