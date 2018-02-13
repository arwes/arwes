export const getParagraphStyles = (theme) => ({
  margin: [0, 0, theme.margin],
});

export default (theme) => ({
  root: getParagraphStyles(theme),
});
