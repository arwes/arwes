import { rgba } from 'polished';
import { placeholder, selection, scrollbar } from '../tools/styling';
import { mapProps } from '../tools/utils';

const mapPropsDescName = (props) => {
  return mapProps(props, (name, value) => ({
    name: `& ${name}`,
    value
  }));
};

const mapPropsDescFontSize = (props) => {
  return mapProps(props, (name, value) => ({
    name: `& ${name}`,
    value: { fontSize: value }
  }));
};

const position0000 = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

export default (theme) => {
  return {
    root: {
      ...position0000,
      position: 'fixed',
      overflow: 'hidden',
      display: 'block',
      boxSizing: 'border-box',
      lineHeight: theme.typography.lineHeight,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: theme.color.primary.base,
      transition: `all ${theme.animTime}ms ease-out`,
      opacity: 1,

      '&$exiting, &$exited': {
        opacity: 0,
      },

      ...mapPropsDescName(placeholder(theme, theme.color.primary.base)),
      ...mapPropsDescName(scrollbar(theme, theme.background.primary.level0, theme.color.primary.base)),
      ...mapPropsDescName(selection(theme, theme.color.primary.base, theme.background.primary.level0)),

      ...mapPropsDescFontSize(theme.typography.headerSizes),

      '& *, & *:before, & *:after': {
        boxSizing: 'inherit',
      },

      '& h1, & h2, & h3, & h4, & h5, & h6': {
        margin: [0, 0, theme.margin],
        fontFamily: theme.typography.headerFontFamily,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadow: `0 0 ${theme.shadowLength}px ` + rgba(theme.color.header.base, theme.alpha),
        color: theme.color.header.base,
        transition: `all ${theme.animTime}ms ease-out`,
      },

      '& p': {
        margin: [0, 0, theme.margin],
      },

      '& small': {
        fontSize: '80%',
      },

      '& cite': {
        fontStyle: 'italic',
      },

      '& blockquote': {
        display: 'block',
        borderLeft: '4px solid ' + theme.color.primary.light,
        margin: [0, 0, theme.margin, theme.margin],
        padding: [0, 0, 0, theme.padding / 2],
        color: theme.color.primary.light,

        '&[data-theme="alert"]': {
          borderColor: theme.color.alert.light,
          color: theme.color.alert.light,
        },
        '&[data-theme="success"]': {
          borderColor: theme.color.success.light,
          color: theme.color.success.light
        },
        '&[data-theme="disabled"]': {
          borderColor: theme.color.disabled.light,
          color: theme.color.disabled.light
        },
      },

      '& dl, & ul, & ol': {
        display: 'block',
        margin: [0, 0, theme.margin, theme.margin],
        padding: 0,

        '& dl, & ul, & ol': {
          marginBottom: 0,
        },
      },

      '& dl': {
        '& dt': {
          fontStyle: 'italic',
          fontWeight: 'bold',
        },
        '& dd': {
          marginLeft: theme.typography.fontSize,
        },
      },

      '& ul': {
        marginLeft: theme.margin + (theme.padding / 2),

        '& li': {
          display: 'block',
          listStyle: 'none',
          paddingLeft: theme.padding,
        },
        '& li:before': {
          position: 'relative',
          left: -(theme.padding / 2),
          display: 'inline-block',
          marginLeft: -theme.padding,
          content: '">>"',
          color: theme.color.primary.light,
        },
      },

      '& ol': {
        marginLeft: theme.padding,
        paddingLeft: theme.typography.fontSize,

        '& ol': {
          marginLeft: 0,
        },
      },

      '& a': {
        color: theme.color.control.base,
        textShadow: `0 0 ${theme.shadowLength}px ` + rgba(theme.color.control.base, theme.alpha),
        transition: `all ${theme.animTime}ms ease-out`,
        textDecoration: 'none',
        cursor: 'pointer',

        '&:hover': {
          color: theme.color.control.light,
        },
      },

      '& hr': {
        display: 'block',
        margin: [0, 0, theme.margin],
        borderStyle: 'solid',
        borderColor: theme.color.primary.dark,
        borderWidth: [0, 0, 1],
      },
    },

    background: {
      ...position0000,
      zIndex: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: theme.background.primary.level0,
      transition: `all ${theme.animTime}ms ease-in`,
      opacity: 0,
    },
    pattern: {
      ...position0000,
      zIndex: 2,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      transition: `all ${theme.animTime}ms ease-in`,
      opacity: 0,
    },
    puffs: {
      ...position0000,
      zIndex: 3,
    },
    main: {
      ...position0000,
      zIndex: 4,
      display: 'block',
      overflowY: 'auto',
    },

    resourcesReadyToShow: {
      '& $background, & $pattern': {
        opacity: 1,
      }
    },

    entering: {},
    entered: {},
    exiting: {},
    exited: {},
  };
};
