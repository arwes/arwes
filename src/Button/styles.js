import { darken } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'inline-block',
      position: 'relative',
      backgroundColor: theme.colorBackground1,
    },
    click: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      animation: `${theme.animTime * 3}ms arwes-button-click 0ms linear 1`,
    },
    button: {
      position: 'relative',
      zIndex: 2,
      display: 'inline-block',
      margin: 0,
      padding: [theme.padding / 2, theme.padding],
      border: `1px solid ${theme.color2Dark}`,
      borderRadius: 0,
      background: 'transparent',

      color: theme.color2,
      fontSize: theme.fontSize,

      transition: `all ${theme.animTime}ms ease-out`,
      userSelect: 'none',
      cursor: 'pointer',

      '&[disabled]': {
        color: theme.colorDisabled,
        borderColor: theme.colorDisabled,
        cursor: 'auto',
      },

      '&:hover:not([disabled])': {
        borderColor: theme.color2,
      },

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
      '& $click': {
        animationName: 'arwes-button-click-success',
      },
      '& $button:not([disabled])': {
        borderColor: theme.colorSuccessDark,
        color: theme.colorSuccess,

        '&:hover:not([disabled])': {
          borderColor: theme.colorSuccess,
        },
      },
    },
    alert: {
      '& $click': {
        animationName: 'arwes-button-click-alert',
      },
      '& $button:not([disabled])': {
        borderColor: theme.colorAlertDark,
        color: theme.colorAlert,

        '&:hover:not([disabled])': {
          borderColor: theme.colorAlert,
        },
      },
    },
    '@keyframes arwes-button-click': {
      '0%': {
        opacity: 1,
        backgroundColor: darken(0.3, theme.color0),
      },
      '100%': {
        opacity: 0,
        backgroundColor: theme.colorBackground1,
      }
    },
    '@keyframes arwes-button-click-success': {
      '0%': {
        opacity: 1,
        backgroundColor: darken(0.3, theme.colorSuccess),
      },
      '100%': {
        opacity: 0,
        backgroundColor: theme.colorBackground1,
      }
    },
    '@keyframes arwes-button-click-alert': {
      '0%': {
        opacity: 1,
        backgroundColor: darken(0.3, theme.colorAlert),
      },
      '100%': {
        opacity: 0,
        backgroundColor: theme.colorBackground1,
      }
    },
  };
};
