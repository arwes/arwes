import { darken } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'block',
      position: 'relative',
    },
    click: {
      zIndex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 1,
      backgroundColor: props => darken(0.3, theme.color[props.layer].base),
      transition: `all ${theme.animTime}ms ease-out`,
    },
    clickPressed: {
      opacity: 0,
      backgroundColor: 'transparent',
    },
    children: {
      zIndex: 2,
      position: 'relative',
      display: 'block',
    },
  };
};
