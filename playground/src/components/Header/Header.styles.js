const styles = theme => ({
  root: {
    display: 'block',
    borderBottom: `1px solid ${theme.color.border}`,
    backgroundColor: theme.color.section,
    fontFamily: theme.typography.content,
    color: theme.color.content,
    userSelect: 'none',

    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none',

      '&hover, &:focus': {
        outline: 'none'
      }
    }
  },
  title: {
    display: 'inline-block',
    margin: 0,
    padding: [8, 10],
    lineHeight: 1,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export { styles };
