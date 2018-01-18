import { lighten } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'inline-block',
      position: 'relative',
      backgroundColor: props => lighten(
        props.active ? theme.accent : 0,
        theme.background[props.layer]['level' + props.level]
      ),
      lineHeight: 1,
      transition: `background-color ${theme.animTime}ms ease-out`,

      '&$exiting, &$exited': {
        backgroundColor: 'transparent',
      },
    },
    button: {
      position: 'relative',
      zIndex: 2,
      display: 'inline-block',
      margin: 0,
      border: 'none',
      padding: [theme.padding / 2, theme.padding],
      background: 'transparent',

      color: props => theme.color[props.disabled ? 'disabled' : props.layer].base,
      fontSize: theme.typography.fontSize * 0.75,
      lineHeight: 1,
      verticalAlign: 'top',

      transition: `all ${theme.animTime}ms ease-out`,
      userSelect: 'none',
      outline: 'none',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none',
      },

      '&::-moz-focus-inner': {
        border: 'none',
      },

      '& .mdi, & .icon': {
        lineHeight: 0,
        fontSize: '140%',
        verticalAlign: 'middle',
      },
    },
    disabled: {
      '& $button': {
        cursor: 'auto',
      }
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
