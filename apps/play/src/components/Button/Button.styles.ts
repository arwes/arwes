import { CSSObject } from '@emotion/react';

import { theme } from '../../theme';

const styles: Record<string, CSSObject> = {
  root: {
    display: 'inline-block',
    outline: 'none',
    border: 'none',
    margin: 0,
    padding: 0,
    verticalAlign: 'middle',
    lineHeight: 'inherit',
    fontSize: '0.8rem',
    color: theme.color.link,
    fontFamily: 'inherit',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'color 150ms ease-out',

    '&::-moz-focus-inner': {
      border: 'none'
    },
    '&:hover': {
      color: theme.color.linkActive
    },
    [theme.breakpoints.tabletUp]: {
      fontSize: '1rem'
    }
  }
};

export { styles };
