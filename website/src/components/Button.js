/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';

const styles = {
  root: theme => ({
    display: 'inline-block',
    outline: 'none',
    margin: 0,
    border: 'none',
    padding: 0,
    userSelect: 'none',
    verticalAlign: 'middle',
    fontSize: 12,
    textTransform: 'uppercase',
    color: theme.color.link,
    fontFamily: theme.typography.content,
    lineHeight: 'inherit',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'color 150ms ease-out',
    '&::-moz-focus-inner': {
      border: 'none'
    },
    '&:hover': {
      color: theme.color.active
    },
    [theme.breakpoints.tabletUp]: {
      fontSize: 16
    }
  }),
  box: theme => ({
    border: `1px solid ${theme.color.border}`,
    padding: '8px 16px',
    lineHeight: '1',
    backgroundColor: theme.color.section
  })
};

const Button = ({ className, onClick, children, isBox }) => (
  <button
    css={[styles.root, isBox && styles.box]}
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  isBox: PropTypes.bool
};

Button.defaultProps = {
  isBox: true
};

export { Button };
