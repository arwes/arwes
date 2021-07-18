/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import settings from '../../settings';

const generateStyles = () => ({
  root: {
    display: 'block',

    a: {
      verticalAlign: 'middle',
      fontSize: '1rem'
    },
    'a + a': {
      marginLeft: '1rem'
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
    </nav>
  );
};

DesktopNavPrimary.propTypes = {
  className: PropTypes.string
};

export { DesktopNavPrimary };
