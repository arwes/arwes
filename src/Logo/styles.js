import { rgba } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'inline-block',
      verticalAlign: 'middle',
      transition: `opacity ${theme.animTime}ms ease-out`,
      animation: props => props.animate
        ? `arwes-logo-rotate ${theme.animTime * 200}ms infinite linear`
        : '',
      opacity: 1,

      '&$exiting, &$exited': {
        opacity: 0,
      },
    },

    light: {
      fill: props => theme.color[props.layer].base,
    },

    center: {
      fill: props => rgba(theme.color[props.layer].base, 0.5),
    },

    outer: {
      fill: props => rgba(theme.color[props.layer].base, 0.2),
    },

    elementFilter: {
      filter: 'url(#arwes-logo-filter-blur)',
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},

    '@keyframes arwes-logo-rotate': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      }
    },
  };
};
