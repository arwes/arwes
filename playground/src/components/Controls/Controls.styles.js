import { rgba } from 'polished';

import { theme } from '../../theme';

const styles = {
  root: {
    zIndex: 1000,
    position: 'relative',
    display: 'block',
    padding: 20,
    fontFamily: theme.typography.content,
    lineHeight: 1.2,
    fontSize: 12,
    color: theme.color.content,

    '& p, & ul': {
      margin: [10, 0]
    },
    '& ul': {
      padding: [0, 0, 0, 10],
      listStyle: 'none'
    },
    '& li': {
      position: 'relative',

      '&::before': {
        content: '">"',
        position: 'absolute',
        left: -10,
        top: 1,
        lineHeight: '1em',
        fontSize: '0.75em',
        color: theme.color.content
      }
    },
    '& a': {
      color: theme.color.content,
      transition: 'color 150ms ease-out',

      '&:hover, &:focus': {
        color: theme.color.active
      }
    },
    '& code': {
      fontFamily: theme.typography.monospace,
      backgroundColor: rgba(theme.color.content, 0.1)
    }
  },
  content: {
    border: `1px solid ${theme.color.border}`,
    padding: 10,
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.color.section
  },
  options: {
    borderBottom: `1px solid ${rgba(theme.color.border, 0.5)}`
  },
  info: {},

  [`@media (min-width: ${theme.breakpoints.tablet}px)`]: {
    root: {
      padding: 0
    },
    content: {
      padding: 10,
      border: 'none'
    }
  }
};

export { styles };
