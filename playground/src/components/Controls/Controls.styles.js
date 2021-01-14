import { rgba } from 'polished';

import { theme } from '../../theme';

const styles = {
  root: {
    zIndex: 1000,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'block',
    padding: 20,
    fontFamily: theme.typography.content,
    lineHeight: 1.2,
    fontSize: 12,
    color: theme.color.content,
    backgroundColor: rgba(theme.color.background, 0.75),

    '& p, & ul': {
      margin: '10px 0'
    },
    '& ul': {
      padding: '0 0 0 10px',
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
    },

    [theme.breakpoints.tabletUp]: {
      position: 'static',
      padding: 0
    }
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto auto 1fr',
    overflowY: 'auto',
    border: `1px solid ${theme.color.border}`,
    padding: '0 10px',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color.section,
    [theme.breakpoints.tabletUp]: {
      border: 'none'
    }
  },
  options: {
    borderBottom: `1px solid ${rgba(theme.color.border, 0.5)}`,
    paddingTop: 10
  },
  guide: {
    paddingTop: 10
  },
  guideTitle: {
    display: 'block',
    padding: '2px 0',
    lineHeight: 1,
    fontSize: 10,
    textTransform: 'uppercase',
    color: rgba(theme.color.content, 0.75)
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: '10px 0',
    [theme.breakpoints.tabletUp]: {
      display: 'none'
    }
  }
};

export { styles };
