import { theme } from '../../theme';

const styles = {
  root: {
    fontSize: 12,

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
      fontSize: 14
    }
  }
};

export { styles };
