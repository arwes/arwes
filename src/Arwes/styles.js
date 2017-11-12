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
      boxSizing: 'borderBox',
      lineHeight: theme.lineHeight,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      color: theme.color0,

      ...mapPropsDescName(placeholder(theme, theme.color0)),
      ...mapPropsDescName(scrollbar(theme, theme.colorBackground0, theme.color0)),
      ...mapPropsDescName(selection(theme, theme.color0, theme.colorBackground0)),

      ...mapPropsDescFontSize(theme.headerSizes),

      '& *, & *:before, & *:after': {
        boxSizing: 'inherit',
      },

      '& h1, & h2, & h3, & h4, & h5, & h6': {
        margin: [0, 0, theme.margin],
        fontFamily: theme.headerFontFamily,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadow: '0 0 4px ' + rgba(theme.color0Light, theme.colorAlpha),
        color: theme.color0Light,
        transition: `all ${theme.animTime}ms ease-out`,
      },

      '& p': {
        margin: [0, 0, theme.margin],
      },
      '& p:lastChild': {
        marginBottom: 0,
      },

      '& small': {
        fontSize: '80%',
      },

      '& cite': {
        fontStyle: 'italic',
      },

      '& blockquote': {
        display: 'block',
        borderLeft: '4px solid ' + theme.color0Light,
        margin: [0, 0, theme.margin, theme.margin],
        padding: [0, 0, 0, theme.padding / 2],
        color: theme.color0Light,

        '&[dataTheme="alert"]': {
          borderColor: theme.colorAlertLight,
          color: theme.colorAlertLight,
        },
        '&[dataTheme="success"]': {
          borderColor: theme.colorSuccessLight,
          color: theme.colorSuccessLight
        },
        '&[dataTheme="disabled"]': {
          borderColor: theme.colorDisabledLight,
          color: theme.colorDisabledLight
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
          marginLeft: theme.fontSize,
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
          marginLeft: -theme.padding,
          content: '>>',
          color: theme.color0Light,
        },
      },

      '& ol': {
        marginLeft: theme.padding,
        paddingLeft: theme.fontSize,

        '& ol': {
          marginLeft: 0,
        },
      },

      '& a': {
        color: theme.color1,
        textShadow: '0 0 4px ' + rgba(theme.color1, theme.colorAlpha),
        transition: `all ${theme.animTime}ms ease-out`,
        textDecoration: 'none',

        '&:hover': {
          color: theme.color1Light,
        },
      },

      '& hr': {
        position: 'relative',
        display: 'block',
        margin: [0, 0, theme.margin],
        borderStyle: 'solid',
        borderColor: theme.color0Dark,
        borderWidth: [0, 0, 1],

        '&:before': {
          content: '',
          position: 'absolute',
          left: 0,
          top: -1,
          display: 'block',
          width: 3,
          height: 3,
          background: theme.color0Dark,
        },
        '&:after': {
          content: '',
          position: 'absolute',
          top: -1,
          right: 0,
          display: 'block',
          width: 3,
          height: 3,
          background: theme.color0Dark,
        },
      },

      '& img': {
        display: 'block',
        border: '1px solid ' + theme.color0Dark,
        margin: [0, 'auto', theme.margin],
        maxWidth: '100%',
      },

      '& figure': {
        display: 'block',
        margin: [0, 'auto', theme.margin],
      },
      '& figcaption': {
        display: 'block',
        margin: 0,
        textAlign: 'center',
      },

      '& video': {
        display: 'block',
        border: '1px solid ' + theme.color0Dark,
        margin: [0, 'auto', theme.margin],
      },

      [`@media screen and (min-width: ${theme.responsive.small + 1}px)`]: {
        fontSize: theme.fontSizeMedium,
        ...mapPropsDescFontSize(theme.headerSizesMedium),
      },
    },
    isReady: {},
    isAnimated: {},
    isShowResources: {
      '&$isReady': {
        '& $background, & $pattern': {
          animation: `arwes-background ${theme.animTime * 2}ms ease-out 0s 1`,
        }
      },
    },
    background: {
      ...position0000,
      zIndex: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: theme.background0,
    },
    pattern: {
      ...position0000,
      zIndex: 2,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
    },
    intern: {
      ...position0000,
      zIndex: 3,
    },
    main: {
      ...position0000,
      zIndex: 4,
      display: 'block',
      overflowY: 'auto',
    },
    puff: {
      position: 'absolute',
      display: 'block',
      width: 1,
      height: 1,
      backgroundColor: rgba(theme.color0, 0.5),
      boxShadow: '0 0 7px 7px ' + rgba(theme.color0, 0.5),
      borderRadius: '50%',
      opacity: 0,
      animation: 'arwes-puff 1000ms ease-out 0s 1',

      '&.puff1': {
        boxShadow: '0 0 10px 10px ' + rgba(theme.color0, 0.5),
        animation: 'arwes-puff-1 1000ms ease-out 0s 1',
      }
    },
    '@keyframes arwes-background': {
      '0%': {
        opacity: 0.1,
      },
      '100%': {
        opacity: 1,
      }
    },
    '@keyframes arwes-puff': {
      '0%': {
        transform: 'scale(0.5, 0.5) translate(0, 30px)',
        opacity: 0.25,
      },
      '75%': {
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1.5, 1.5) translate(0, -30px)',
        opacity: 0,
      }
    },
    '@keyframes arwes-puff-1': {
      '0%': {
        transform: 'scale(0.5, 0.5) translate(0, 50px)',
        opacity: 0.25,
      },
      '75%': {
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1.5, 1.5) translate(0, -50px)',
        opacity: 0,
      },
    },
  };
};
