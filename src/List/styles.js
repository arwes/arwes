export const getListStyles = (theme) => ({
  display: 'block',
  margin: [0, 0, theme.margin, theme.margin],
  padding: 0,

  '& dl, & ul, & ol': {
    marginBottom: 0,
  },
});

export const getULStyles = (theme) => ({
  marginLeft: theme.margin + (theme.padding / 2),

  '& li': {
    display: 'block',
    listStyle: 'none',
    paddingLeft: theme.padding,
  },
  '& li:before': {
    position: 'relative',
    left: -(theme.padding / 2),
    display: 'inline-block',
    marginLeft: -theme.padding,
    content: '">>"',
    color: theme.color.primary.light,
  },
});

export const getOLStyles = (theme) => ({
  marginLeft: theme.padding,
  paddingLeft: theme.typography.fontSize,

  '& ol': {
    marginLeft: 0,
  },
});

export const getDLStyles = (theme) => ({
  '& dt': {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  '& dd': {
    marginLeft: theme.typography.fontSize,
  },
});

export default (theme) => ({
  root: {
    ...getListStyles(theme),
    'ul&': getULStyles(theme),
    'ol&': getOLStyles(theme),
    'dl&': getDLStyles(theme),
  },
});
