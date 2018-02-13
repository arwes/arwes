export const getBlockquoteStyles = (theme) => ({
  display: 'block',
  borderLeft: '4px solid ' + theme.color.primary.light,
  margin: [0, 0, theme.margin, theme.margin],
  padding: [0, 0, 0, theme.padding / 2],
  color: theme.color.primary.light,

  '&[data-layer="alert"]': {
    borderColor: theme.color.alert.light,
    color: theme.color.alert.light,
  },
  '&[data-layer="success"]': {
    borderColor: theme.color.success.light,
    color: theme.color.success.light
  },
  '&[data-layer="disabled"]': {
    borderColor: theme.color.disabled.light,
    color: theme.color.disabled.light
  },
});

export default (theme) => ({
  root: getBlockquoteStyles(theme),
});
