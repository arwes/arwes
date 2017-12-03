export default (theme) => {
  return {
    root: {
      position: 'relative',
      display: 'block',
      margin: [0, 0, theme.margin],
      width: '100%',
      height: 1,

      '&$exiting, &$exited': {
        '& $line': {
          width: '0%',
        },
        '& $left, & $right': {
          opacity: 0,
        },
      },
    },
    line: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      display: 'block',
      borderStyle: 'solid',
      borderColor: props => theme.color[props.layer].dark,
      borderWidth: '0 0 1px',
      transition: `all ${theme.animTime}ms ease-out`,
    },
    left: {
      position: 'absolute',
      left: 0,
      top: -1,
      display: 'block',
      width: 3,
      height: 3,
      background: props => theme.color[props.layer].dark,
      opacity: 1,
      transition: `all ${(theme.animTime / 4) * 3}ms ease-out ${theme.animTime / 4}ms`,
    },
    right: {
      position: 'absolute',
      top: -1,
      right: 0,
      display: 'block',
      width: 3,
      height: 3,
      background: props => theme.color[props.layer].dark,
      opacity: 1,
      transition: `all ${(theme.animTime / 4) * 3}ms ease-out ${theme.animTime / 4}ms`,
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
