import { CSSObject } from '@emotion/react';

import { theme } from '../../theme';

const styles: Record<string, CSSObject> = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottom: `1px solid ${theme.color.border}`,
    height: 36,
    lineHeight: '36px',
    fontFamily: theme.typography.content,
    color: theme.color.link,
    userSelect: 'none',
    backgroundColor: theme.color.section,
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none',
      transition: 'color 150ms ease-out',

      '&:hover, &:focus': {
        color: theme.color.linkActive,
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
    paddingRight: 5,
    fontFamily: theme.typography.content,
    color: theme.color.link,
    fontSize: 12,
    cursor: 'pointer',
    transition: 'color 150ms ease-out',

    '&:hover, &:focus': {
      color: theme.color.linkActive,
      outline: 'none'
    },

    [theme.breakpoints.tabletUp]: {
      marginLeft: 10,
      fontSize: 16
    }
  },
  optionActive: {
    color: theme.color.linkActive
  }
};

export { styles };
