const styles = theme => ({
  root: {
    display: 'flex',
    borderBottom: `1px solid ${theme.color.border}`,
    padding: [8, 10],
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
  menu: {
    display: 'block',
    marginRight: 5,
    lineHeight: 1,
    fontSize: 20,
    cursor: 'pointer'
  },
  title: {
    display: 'block',
    margin: 0,
    lineHeight: 1,
    fontSize: 20
  },

  '@media only screen and (min-width: 768px)': {
    menu: {
      display: 'none'
    }
  }
});

export { styles };
