import { theme } from '../../theme';

const styles = {
  root: {
    fontSize: 10,

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
      fontSize: 12
    }
  }
};

export { styles };
