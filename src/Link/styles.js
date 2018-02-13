import { rgba } from 'polished';

export const getLinkStyles = (theme) => ({
  color: theme.color.control.base,
  textShadow: `0 0 ${theme.shadowLength}px ` + rgba(theme.color.control.base, theme.alpha),
  transition: `color ${theme.animTime}ms ease-out`,
  textDecoration: 'none',
  cursor: 'pointer',

  '&:hover': {
    color: theme.color.control.light,
  },
});

export default (theme) => ({
  root: getLinkStyles(theme),
});
