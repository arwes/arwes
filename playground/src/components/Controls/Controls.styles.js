import { rgba } from 'polished';

import { theme } from '../../theme';

const resetTextStyles = {
  fontFamily: theme.typography.content,
  lineHeight: 1.3,
  fontSize: 16,
  color: theme.color.content
};

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
    backgroundColor: rgba(theme.color.background, 0.75),
    ...resetTextStyles,

    '& p, & ul': {
      ...resetTextStyles,
      margin: '15px 0'
    },
    '& ul': {
      padding: '0 0 0 20px',
      listStyle: 'none'
    },
    '& li': {
      position: 'relative',

      '&::before': {
        content: '">"',
        position: 'absolute',
        left: -15,
        top: 3,
        lineHeight: '1em',
        fontSize: '0.9em',
        color: theme.color.content
      }
    },
    '& a': {
      ...resetTextStyles,
      color: theme.color.content,
      textDecoration: 'underline',
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
    padding: '0 15px',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color.section,
    [theme.breakpoints.tabletUp]: {
      border: 'none'
    }
  },
  options: {
    borderBottom: `1px solid ${rgba(theme.color.border, 0.5)}`,
    marginTop: 15
  },
  guide: {
    marginTop: 15
  },
  guideTitle: {
    display: 'block',
    lineHeight: 1,
    fontSize: 14,
    textTransform: 'uppercase',
    color: rgba(theme.color.headings, 0.75)
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: '15px 0',
    [theme.breakpoints.tabletUp]: {
      display: 'none'
    }
  }
};

export { styles };
