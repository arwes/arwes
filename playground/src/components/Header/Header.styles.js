const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottom: `1px solid ${theme.color.border}`,
    height: 36,
    lineHeight: '36px',
    fontFamily: theme.typography.content,
    color: theme.color.content,
    userSelect: 'none',
    backgroundColor: theme.color.section,

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
    display: 'block',
    margin: 0,
    padding: [0, 10],
    fontSize: 16,
    whiteSpace: 'nowrap'
  },
  options: {
    display: 'flex',
    paddingRight: 5
  },
  option: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'opacity 150ms ease-out'
  },
  optionActive: {
    opacity: 1
  },
  optionIcon: {
    display: 'inline-block',
    padding: 5,
    fontSize: 18
  },
  optionText: {
    paddingRight: 5,
    fontSize: 12
  },
  optionControls: {},

  [`@media (min-width: ${theme.breakpoints.tablet}px)`]: {
    title: {
      fontSize: 20
    },
    optionIcon: {
      fontSize: 20
    },
    optionText: {
      fontSize: 14
    },
    optionControls: {
      display: 'none'
    }
  }
});

export { styles };
