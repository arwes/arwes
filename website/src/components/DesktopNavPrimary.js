/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import settings from '../../settings';

const generateStyles = ({ breakpoints }) => ({
  root: {
    display: 'block',

    '& a': {
      fontSize: 12
    },
    '& a + a': {
      marginLeft: 10
    },

    [breakpoints.up('md')]: {
      '& a': {
        fontSize: 16
      }
    }
  }
});

const DesktopNavPrimary = ({ className }) => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <nav className={className} css={styles.root}>
      {settings.hierarchy.map(({ name, path }) =>
        <Link key={name} to={`/${path}`}>{name}</Link>
      )}
      <a href='https://playground.arwes.dev' target='playground'>Playground</a>
    </nav>
  );
};

DesktopNavPrimary.propTypes = {
  className: PropTypes.string
};

export { DesktopNavPrimary };
