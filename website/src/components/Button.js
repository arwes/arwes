/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';

const generateStyles = ({ breakpoints, palette }) => ({
  root: {
    display: 'inline-block',
    outline: 'none',
    margin: 0,
    border: 'none',
    padding: '8px 0',
    userSelect: 'none',
    verticalAlign: 'middle',
    lineHeight: 1,
    fontSize: 12,
    textTransform: 'uppercase',
    color: palette.text.link,
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'color 150ms ease-out',

    '&:hover, &:focus': {
      color: palette.text.linkHover
    },
    [breakpoints.up('md')]: {
      fontSize: 16
    }
  },
  box: {
    border: `1px solid ${palette.primary.main}`,
    padding: '8px 16px',
    backgroundColor: palette.neutral.elevate(2)
  }
});

const Button = ({ className, onClick, children, isBox }) => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <button
      css={[styles.root, isBox && styles.box]}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

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
