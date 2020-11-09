const styles = theme => ({
  root: {
    '& textarea': {
      // Prism editor uses inline styles.
      color: `${theme.color.content} !important`,
      background: `${theme.color.background} !important`,

      outline: 'none',

      '&:hover': {
        outline: 'none'
      }
    }
  }
});

export { styles };
