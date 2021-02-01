import rgba from 'polished/lib/color/rgba';
import { CSSObject } from '@emotion/css';
import { Theme } from '@arwes/design';

const createGlobalGeneralStyles = (theme: Theme): Record<string, CSSObject> => {
  return {
    '*, *:before, *:after': {
      boxSizing: 'border-box'
    },
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.neutral.main,

      // Fonts
      fontSize: '16px',
      lineHeight: 1.2,
      color: theme.palette.text.root,

      // Scrollbars
      scrollbarWidth: 'thin',
      scrollbarColor: theme.palette.neutral.elevate(4) + ' transparent',
      '& ::-webkit-scrollbar': {
        width: 10
      },
      '& ::-webkit-scrollbar-thumb': {
        background: theme.palette.neutral.elevate(4),
        transition: 'background 150ms ease-out',
        '&:hover': {
          background: theme.palette.neutral.elevate(5)
        }
      },
      '& ::-webkit-scrollbar-track': {
        background: 'transparent'
      },

      // Selection
      '& ::selection': {
        backgroundColor: rgba(theme.palette.primary.main, 0.2),
        color: 'inherit'
      }
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 1,
      fontWeight: 'bold',
      color: theme.palette.text.headings,
      textTransform: 'uppercase',
      textShadow: `0 0 ${theme.shadow.blur(1)}px ${theme.palette.text.headings}`
    },
    h1: { fontSize: '1.75rem' },
    h2: { fontSize: '1.625rem' },
    h3: { fontSize: '1.5rem' },
    h4: { fontSize: '1.375rem' },
    h5: { fontSize: '1.25rem' },
    h6: { fontSize: '1.125rem' },
    a: {
      color: theme.palette.text.link,
      transition: 'color 150ms ease-out',
      outline: 'none',

      '&:hover, &:focus': {
        color: theme.palette.text.linkHover
      }
    }
  };
};

export { createGlobalGeneralStyles };
