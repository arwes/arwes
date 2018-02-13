import { rgba } from 'polished';

export const getHeadingStyles = (theme) => ({
  margin: [0, 0, theme.margin],
  fontFamily: theme.typography.headerFontFamily,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  textShadow: `0 0 ${theme.shadowLength}px ` + rgba(theme.color.header.base, theme.alpha),
  color: theme.color.header.base,
  transition: `color ${theme.animTime}ms ease-out`,
});

export default (theme) => ({
  root: {
    ...getHeadingStyles(theme),
    'h1&': { fontSize: theme.typography.headerSizes.h1 },
    'h2&': { fontSize: theme.typography.headerSizes.h2 },
    'h3&': { fontSize: theme.typography.headerSizes.h3 },
    'h4&': { fontSize: theme.typography.headerSizes.h4 },
    'h5&': { fontSize: theme.typography.headerSizes.h5 },
    'h6&': { fontSize: theme.typography.headerSizes.h6 },
  },
});
