/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import settings from '../../settings';
import { renderNavItemContent } from '../tools/renderNavItemContent';

const styles = {
  root: {
    lineHeight: 1,

    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },
    '& ul ul': {
      paddingLeft: 20
    },
    '& li': {
      fontSize: 16,

      '&::before': {
        display: 'none'
      }
    },
    '& a': {
      display: 'block',
      padding: '5px 0'
    }
  }
};

const DesktopNavSecondary = ({ location, className }) => {
  const [primaryPath] = location.pathname.split('/').filter(Boolean);
  const primarySection = settings.hierarchy.find(({ path }) => path === primaryPath);

  return (
    <aside css={styles.root} className={className}>
      {!!primarySection && !!primarySection.items.length && (
        <ul>
          {primarySection.items.map((item, index) =>
            <li key={index}>
              <Link to={`/${primaryPath}/${item.path}`}>
                {renderNavItemContent(item.name)}
              </Link>
              {!!item.items && !!item.items.length && (
                <ul>
                  {item.items.map((subItem, subIndex) =>
                    <li key={subIndex}>
                      <Link to={`/${primaryPath}/${item.path}/${subItem.path}`}>
                        {renderNavItemContent(subItem.name)}
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )}
        </ul>
      )}
    </aside>
  );
};

DesktopNavSecondary.propTypes = {
  location: PropTypes.object,
  className: PropTypes.string
};

export { DesktopNavSecondary };
