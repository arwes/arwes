import { theme } from '../../theme';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.color.border}`,
    padding: '4px 10px',
    color: theme.color.content,
    fontSize: 12,
    fontFamily: theme.typography.content,
    backgroundColor: theme.color.section,
    userSelect: 'none',
    '& a': {
      color: theme.color.content,
      textDecoration: 'none',
      transition: 'color 150ms ease-out',

      '&:hover, &:focus': {
        color: theme.color.active
      }
    },
    '& a + a': {
      marginLeft: 10
    },
    [theme.breakpoints.tabletUp]: {
      padding: '8px 15px',
      fontSize: 14
    }
  }
};

export { styles };
