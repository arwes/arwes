import { CSSObject } from '@emotion/react';

import { theme } from '../../theme';

const styles: Record<string, CSSObject> = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.color.border}`,
    padding: '4px 10px',
    fontSize: 12,
    fontFamily: theme.typography.content,
    backgroundColor: theme.color.section,
    userSelect: 'none',
    '& a': {
      color: theme.color.link,
      textDecoration: 'none',
      transition: 'color 150ms ease-out',

      '&:hover, &:focus': {
        color: theme.color.linkActive
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
