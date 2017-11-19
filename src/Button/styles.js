export default (theme) => {
  return {
    root: {
      display: 'inline-block',
      position: 'relative',
      backgroundColor: theme.background.primary.level0,
    },
    button: {
      position: 'relative',
      zIndex: 2,
      display: 'inline-block',
      margin: 0,
      padding: [theme.padding / 2, theme.padding],
      background: 'transparent',
      border: 'none',

      color: theme.color.control.base,
      fontSize: theme.typography.fontSize * 0.75,

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
    success: {
      '& $button:not([disabled])': {
        color: theme.color.success.base,
      },
    },
    alert: {
      '& $button:not([disabled])': {
        color: theme.color.alert.base,
      },
    },
    disabled: {
      '& $button': {
        color: theme.color.disabled.base,
        cursor: 'auto',
      }
    },
    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
