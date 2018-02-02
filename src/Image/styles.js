import { rgba } from 'polished';

export default (theme) => {
  return {
    root: {
      position: 'relative',
      display: 'block',
      margin: [0, 0, theme.margin],
      width: '100%',
      minHeight: 1,
      verticalAlign: 'middle',

      '&$exiting, &$exited': {
        '& $separator': {
          width: 0,
        },
        '& $img, & $children': {
          opacity: 0,
        },
      },
    },
    holder: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      transition: `all ${theme.animTime}ms ease-out`,
      minHeight: 200,
    },
    img: {
      display: 'block',
      border: 'none',
      margin: 0,
      padding: 0,
      width: '100%',
      height: 'auto',
      verticalAlign: 'top',
      boxShadow: 'none',
      transition: `all ${theme.animTime}ms ease-in`,
      opacity: 0,
    },
    error: {
      display: 'block',
      margin: 'auto',
      textAlign: 'center',
      color: theme.color.alert.base,
    },
    separator: {
      position: 'absolute',
      top: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'block',
      width: '100%',
      borderStyle: 'solid',
      borderColor: props => rgba(theme.color[props.layer].dark, theme.alpha / 2),
      borderWidth: '0 0 1px',
      transition: `all ${theme.animTime}ms ease-in`,
    },
    children: {
      display: 'block',
      margin: 0,
      padding: theme.padding / 2,
      textAlign: 'center',
      backgroundColor: props => theme.background[props.layer].level1,
      color: props => theme.color[props.layer].dark,
      transition: `opacity ${theme.animTime}ms ease-in`,
      opacity: 1,
    },

    ready: {
      '& $holder': {
        minHeight: 'auto',
      },
      '& $img': {
        opacity: 1,
      },
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
