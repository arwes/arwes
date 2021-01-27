import { theme } from '../../theme';

const styles = {
  root: {
    display: 'inline-block',
    outline: 'none',
    border: `1px solid ${theme.color.border}`,
    margin: 0,
    padding: '8px 16px',
    userSelect: 'none',
    verticalAlign: 'middle',
    fontSize: 14,
    textTransform: 'uppercase',
    color: theme.color.content,
    fontFamily: theme.typography.content,
    lineHeight: '1',
    fontWeight: 'normal',
    cursor: 'pointer',
    backgroundColor: theme.color.section,
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
  }
};

export { styles };
