import { Styles } from 'jss';

import { theme } from '../../theme';

const styles: Styles = {
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
    }
  },
  title: {
    display: 'block',
    margin: 0,
    padding: [0, 10],
    fontSize: 16,
    whiteSpace: 'nowrap'
  },
  options: {
    display: 'flex',
    paddingRight: 5
  },
  option: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'color 150ms ease-out',

    '&:hover, &:focus': {
      color: theme.color.active,
      outline: 'none'
    }
  },
  optionActive: {
    color: theme.color.active
  },
  optionIcon: {
    display: 'inline-block',
    padding: 5,
    fontSize: 18
  },
  optionText: {
    paddingRight: 5,
    fontSize: 12
  },

  [`@media (min-width: ${theme.breakpoints.tablet}px)`]: {
    title: {
      fontSize: 20
    },
    optionIcon: {
      fontSize: 20
    },
    optionText: {
      fontSize: 14
    }
  }
};

export { styles };
