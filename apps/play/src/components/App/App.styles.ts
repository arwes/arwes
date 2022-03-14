import { CSSObject } from '@emotion/react';
import { rgba, lighten } from 'polished';

import { theme } from '../../theme';

const styles: Record<string, CSSObject> = {
  global: {
    '*, *:before, *:after': {
      boxSizing: 'border-box'
    },
    'html, body': {
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      lineHeight: 1.2,
      fontSize: '16px',
      fontFamily: theme.typography.content,
      color: theme.color.content,
      backgroundColor: theme.color.background,
      scrollbarWidth: 'thin',
      scrollbarColor: lighten(0.1, theme.color.background) + ' ' + lighten(0.05, theme.color.background)
    },
    '::-webkit-scrollbar': {
      width: 8
    },
    '::-webkit-scrollbar-track': {
      background: lighten(0.05, theme.color.background)
    },
    '::-webkit-scrollbar-thumb': {
      background: lighten(0.1, theme.color.background)
    },
    '::selection': {
      backgroundColor: theme.color.content,
      color: theme.color.background
    },
    'h1, h2, h3, h4, h5, h6': {
      color: theme.color.headings,
      textTransform: 'uppercase'
    },
    a: {
      color: theme.color.link,
      textDecoration: 'none',
      transition: 'color 150ms ease-out',

      '&:hover': {
        color: theme.color.linkActive
      }
    }
  },
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    display: 'flex',
    minHeight: 0 // Height overflow issue.
  },
  controls: {
    minHeight: 0, // Height overflow issue.

    [theme.breakpoints.tabletUp]: {
      width: 280,
      borderRight: `1px solid ${theme.color.border}`
    }
  },
  main: {
    flex: 1,
    display: 'flex',
    minHeight: 0 // Height overflow issue.
  },
  panel: {
    position: 'relative',
    overflow: 'auto',
    width: '100%'
  },
  isPanelHalf: {
    width: '50%'
  },
  editor: {
    borderRight: `1px solid ${rgba(theme.color.border, 0.5)}`,
    backgroundColor: theme.color.background
  },
  editorOnly: {
    borderRight: 'none'
  },
  preview: {
    padding: 10,

    [theme.breakpoints.tabletUp]: {
      padding: 15
    }
  }
};

export { styles };
