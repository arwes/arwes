const styles = theme => ({
  root: {
    display: 'block',
    borderTop: `1px solid ${theme.color.border}`,
    padding: [4, 10],
    color: theme.color.content,
    fontSize: 14,
    fontFamily: theme.typography.content,
    backgroundColor: theme.color.section,
    userSelect: 'none'
  }
});

export { styles };
