import { theme } from '../../theme';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottom: `1px solid ${theme.color.border}`,
    height: 36,
    lineHeight: '36px',
    fontFamily: theme.typography.content,
    color: theme.color.content,
    userSelect: 'none',
    backgroundColor: theme.color.section,
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none',
      transition: 'color 150ms ease-out',

      '&:hover, &:focus': {
        color: theme.color.active,
        outline: 'none'
      }
    },

    [theme.breakpoints.tabletUp]: {
      height: 50,
      lineHeight: '50px'
    }
  },
  title: {
    display: 'block',
    margin: 0,
    padding: '0 10px',
    fontSize: 16,
    fontFamily: theme.typography.content,
    color: theme.color.headings,
    whiteSpace: 'nowrap',
    letterSpacing: 0,
    textTransform: 'none',
    textShadow: 'none',

    [theme.breakpoints.tabletUp]: {
      padding: '0 15px',
      fontSize: 24
    }
  },
  options: {
    display: 'flex',
    paddingRight: 5,

    [theme.breakpoints.tabletUp]: {
      paddingRight: 15
    }
  },
  option: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.content,
    color: theme.color.content,
    cursor: 'pointer',
    transition: 'color 150ms ease-out',

    '&:hover, &:focus': {
      color: theme.color.active,
      outline: 'none'
    },

    [theme.breakpoints.tabletUp]: {
      marginLeft: 10
    }
  },
  optionActive: {
    color: theme.color.active
  },
  optionIcon: {
    display: 'inline-block',
    padding: 5,
    fontSize: 18,

    [theme.breakpoints.tabletUp]: {
      fontSize: 20
    }
  },
  optionText: {
    paddingRight: 5,
    fontSize: 12,

    [theme.breakpoints.tabletUp]: {
      fontSize: 16
    }
  }
};

export { styles };
