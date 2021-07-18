import { theme } from '../../theme';

const styles = {
  root: {
    fontSize: 12,
    lineHeight: 1.2,

    // Prism editor uses inline styles.
    fontFamily: `${theme.typography.monospace} !important`,

    '& textarea': {
      outline: 'none',

      // Prism editor uses inline styles.
      color: `${theme.color.content} !important`,
      background: `${theme.color.background} !important`,

      '&:hover': {
        outline: 'none'
      }
    },

    [theme.breakpoints.tabletUp]: {
      fontSize: 14,

      '& textarea, & pre': {
        padding: '15px !important'
      }
    }
  }
};

export { styles };
