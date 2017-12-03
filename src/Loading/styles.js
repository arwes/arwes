export default (theme) => {
  return {
    root: {
      zIndex: 1000,
      position: 'relative',
      display: 'block',
      minHeight: 50 + theme.padding * 2,
      transition: `all ${theme.animTime}ms ease-out`,
      opacity: 1,

      '&$exiting, &$exited': {
        opacity: 0,
      },
    },

    circle: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      display: 'block',

      borderTop: props => '5px solid ' + theme.color[props.layer].base,
      borderBottom: props => '5px solid ' + theme.color[props.layer].base,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',

      borderRadius: '50%',
      backgroundColor: 'transparent',
      boxShadow: props => `0 0 ${theme.shadowLength * 2}px ${theme.color[props.layer].base}`,
      transition: `all ${theme.animTime}ms ease-out`,
    },
    circle1: {
      marginLeft: -25,
      marginTop: -25,
      width: 50,
      height: 50,
      animation: `arwes-loading-circle1 ${theme.animTime * 3}ms infinite linear`,
    },
    circle2: {
      marginLeft: -15,
      marginTop: -15,
      width: 30,
      height: 30,
      animation: `arwes-loading-circle2 ${theme.animTime * 3}ms infinite linear`,
    },

    isSmall: {
      display: 'inline-block',
      minWidth: 16,
      minHeight: 16,
      verticalAlign: 'middle',

      '& $circle2': {
        marginLeft: -8,
        marginTop: -8,
        width: 16,
        height: 16,

        borderTop: props => '3px solid ' + theme.color[props.layer].base,
        borderBottom: props => '3px solid ' + theme.color[props.layer].base,
        borderLeft: '3px solid transparent',
        borderRight: '3px solid transparent',
      },
    },

    isFull: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},

    '@keyframes arwes-loading-circle1': {
      '0%': {
        transform: 'rotate(160deg)',
        opacity: 0,
      },
      '50%': {
        transform: 'rotate(145deg)',
        opacity: 1,
      },
      '100%': {
        transform: 'rotate(-320deg)',
        opacity: 0,
      }
    },
    '@keyframes arwes-loading-circle2': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      }
    }
  };
};
