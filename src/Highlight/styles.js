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
      backgroundColor: props => darken(0.3, theme.color[props.layer].base),
      animation: `arwes-highlight-click ${theme.animTime}ms ease-out 0ms 1`,
    },
    children: {
      zIndex: 2,
      position: 'relative',
      display: 'block',
    },

    '@keyframes arwes-highlight-click': {
      '0%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0,
        backgroundColor: 'transparent',
      },
    },
  };
};
