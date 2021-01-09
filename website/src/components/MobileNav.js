/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import settings from '../../settings';
import { Button } from './Button';

const styles = {
  root: {
    display: 'block'
  },
  menu: theme => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto',
    backgroundColor: theme.color.section,

    '& ul': {
      margin: 0,
      padding: '0 0 0 20px',
      listStyle: 'none'
    },
    '& li': {
      lineHeight: 1,
      fontSize: 16
    },
    '& a': {
      display: 'block',
      padding: '10px 0'
    }
  }),
  header: theme => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottom: `1px solid ${theme.color.border}`,
    padding: '11px 10px',
    lineHeight: '30px',
    backgroundColor: theme.color.section
  }),
  title: {
    margin: 0,
    lineHeight: '30px',
    fontSize: 20
  }
};

const MobileNav = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = ({ target: { tagName } }) => {
    if (tagName === 'A' || tagName === 'BUTTON') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <nav css={styles.root} className={className}>
      <Button onClick={onClick} isBox={false}>
        Open Menu
      </Button>
      {isOpen && (
        <div css={styles.menu} onClick={onClick}>
          <header css={styles.header}>
            <h1 css={styles.title}>Menu</h1>
            <Button isBox={false}>Close Menu</Button>
          </header>
          <ul>
            {settings.hierarchy.map((item1, index1) =>
              <li key={index1}>
                <Link to={`/${item1.path}`}>
                  {item1.name}
                </Link>
                {!!item1.items && !!item1.items.length && (
                  <ul>
                    {item1.items.map((item2, index2) =>
                      <li key={index2}>
                        <Link to={`/${item1.path}/${item2.path}`}>
                          {item2.name}
                        </Link>
                        {!!item2.items && !!item2.items.length && (
                          <ul>
                            {item2.items.map((item3, index3) =>
                              <li key={index3}>
                                <Link to={`/${item1.path}/${item2.path}/${item3.path}`}>
                                  {item3.name}
                                </Link>
                              </li>
                            )}
                          </ul>
                        )}
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

MobileNav.propTypes = {
  className: PropTypes.string
};

export { MobileNav };
