import { theme } from '../../theme';

const styles = {
  root: {
    fontSize: 10,

    // Prism editor uses inline styles.
    fontFamily: [theme.typography.monospace, '!important'],

    '& textarea': {
      // Prism editor uses inline styles.
      color: [theme.color.content, '!important'],
      background: [theme.color.background, '!important'],

      outline: 'none',

      '&:hover': {
        outline: 'none'
      }
    }
  },

  [`@media (min-width: ${theme.breakpoints.tablet}px)`]: {
    root: {
      fontSize: 12
    }
  }
};

export { styles };
