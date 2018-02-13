import { rgba } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'block',
      verticalAlign: 'middle',

      '&$exiting, &$exited': {
        '& $header, & $children': {
          backgroundColor: 'transparent',
        },
        '& $icon': {
          opacity: 0,
        },
        '& $separator': {
          width: 0,
        },
      },

      '&:hover': {
        '& $separator': {
          borderColor: theme.color.primary.base,
          boxShadow: `0 0 ${theme.shadowLength}px `
            + rgba(theme.color.primary.base, theme.alpha),
        },
      },
    },
    header: {
      position: 'relative',
      padding: [theme.padding, theme.padding * 3, theme.padding, theme.padding],
      transition: `all ${theme.animTime}ms ease-out`,
      backgroundColor: rgba(theme.background.primary.level1, theme.alpha),

      '& h1, & h2, & h3, & h4, & h5, & h6': {
        margin: 0,
        fontSize: props => theme.typography.headerSizes[props.headerSize],
      }
    },
    separator: {
      position: 'absolute',
      top: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'block',
      width: '100%',
      borderStyle: 'solid',
      borderColor: theme.color.primary.dark,
      borderWidth: '0 0 1px',
      transition: `all ${theme.animTime}ms ease-in`,
    },
    icon: {
      position: 'absolute',
      right: theme.margin,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: props => theme.typography.headerSizes[props.headerSize],
      color: theme.color.header.base,
      textShadow: `0 0 ${theme.shadowLength}px ` + rgba(theme.color.header.base, theme.alpha),
      transition: `all ${theme.animTime}ms ease-out`,
      opacity: 1,
    },
    children: {
      transition: `all ${theme.animTime}ms ease-out`,
      backgroundColor: rgba(theme.background.primary.level0, theme.alpha),
      padding: theme.padding,

      '& p, & ul, & ol, & dl, & blockquote': {
        margin: 0,
      },
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
