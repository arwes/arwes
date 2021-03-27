/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { rgba } from 'polished';

import settings from '../../settings';
import { renderNavItemContent } from '../tools/renderNavItemContent';
import { Button } from './Button';

const generateStyles = ({ palette }) => ({
  root: {
    display: 'block'
  },
  modal: {
    zIndex: 1000,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    padding: 20,
    backgroundColor: rgba(palette.neutral.elevate(0), 0.75),

    '& ul': {
      margin: 0,
      padding: '0 0 0 20px',
      listStyle: 'none'
    },
    '& li': {
      lineHeight: 2,
      fontSize: 16
    },
    '& a': {
      display: 'block'
    }
  },
  modalContent: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr auto',
    border: '1px solid ' + palette.primary.main,
    minHeight: 0, // Height overflow issue.
    backgroundColor: palette.neutral.elevate(2)
  },
  modalHeader: {
    borderBottom: '1px solid ' + palette.primary.main,
    padding: 10,
    lineHeight: '30px',
    backgroundColor: palette.neutral.elevate(2)
  },
  modalTitle: {
    margin: 0,
    lineHeight: 1,
    fontSize: 20
  },
  modalBody: {
    overflowY: 'auto',
    padding: 10
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid ' + palette.primary.main,
    padding: 10
  }
});

const MobileNavMenu = () => (
  <ul>
    {settings.hierarchy.map((item1, index1) =>
      <li key={index1}>
        <Link to={`/${item1.path}`}>
          {renderNavItemContent(item1.name)}
        </Link>
        {!!item1.items && !!item1.items.length && (
          <ul>
            {item1.items.map((item2, index2) =>
              <li key={index2}>
                <Link to={`/${item1.path}/${item2.path}`}>
                  {renderNavItemContent(item2.name)}
                </Link>
                {!!item2.items && !!item2.items.length && (
                  <ul>
                    {item2.items.map((item3, index3) =>
                      <li key={index3}>
                        <Link to={`/${item1.path}/${item2.path}/${item3.path}`}>
                          {renderNavItemContent(item3.name)}
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
);

const MobileNav = ({ className }) => {
  const theme = useTheme();
  const styles = generateStyles(theme);

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
        <div css={styles.modal}>
          <div css={styles.modalContent} onClick={onClick}>
            <div css={styles.modalHeader}>
              <h1 css={styles.modalTitle}>Menu</h1>
            </div>
            <div css={styles.modalBody}>
              <MobileNavMenu />
            </div>
            <div css={styles.modalFooter}>
              <Button isBox={false}>Close Menu</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

MobileNav.propTypes = {
  className: PropTypes.string
};

export { MobileNav };
