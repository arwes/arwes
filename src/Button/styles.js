export default (theme) => {
  return {
    root: {
      display: 'inline-block',
      position: 'relative',
      backgroundColor: props => theme.background[props.layer]['level' + props.level],
      lineHeight: 1,

      '&$entering, &$exiting, &$exited': {
        backgroundColor: 'transparent',
      },
    },
    button: {
      position: 'relative',
      zIndex: 2,
      display: 'inline-block',
      margin: 0,
      padding: [theme.padding / 2, theme.padding],
      background: 'transparent',
      border: 'none',

      color: props => theme.color[props.disabled ? 'disabled' : props.layer].base,
      fontSize: theme.typography.fontSize * 0.75,
      lineHeight: 1,
      verticalAlign: 'top',

      transition: `all ${theme.animTime}ms ease-out`,
      userSelect: 'none',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none',
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
