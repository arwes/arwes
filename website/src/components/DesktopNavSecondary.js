/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import settings from '../../settings';

const renderItemContent = text => {
  const content = String(text);

  if (/^`.+`$/.test(content)) {
    return <code>{content.replace(/`/g, '')}</code>;
  }

  return text;
};

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
      fontSize: 16
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
                {renderItemContent(item.name)}
              </Link>
              {!!item.items && !!item.items.length && (
                <ul>
                  {item.items.map((subItem, subIndex) =>
                    <li key={subIndex}>
                      <Link to={`/${primaryPath}/${item.path}/${subItem.path}`}>
                        {renderItemContent(subItem.name)}
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
