import { darken } from 'polished';

export default (theme) => {
  return {
    root: {
      display: 'block',
      position: 'relative',
    },
    click: {
      zIndex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      animation: `${theme.animTime}ms arwes-highlight-click 0ms linear 1`,
    },
    children: {
      zIndex: 2,
      position: 'relative',
      display: 'block',
    },
    success: {
      '& $click': {
        animationName: 'arwes-highlight-click-success',
      },
    },
    alert: {
      '& $click': {
        animationName: 'arwes-highlight-click-alert',
      },
    },
    '@keyframes arwes-highlight-click': {
      '0%': {
        opacity: 1,
        backgroundColor: darken(0.3, theme.color.primary.base),
      },
      '100%': {
        opacity: 0,
        backgroundColor: 'transparent',
      }
    },
    '@keyframes arwes-highlight-click-success': {
      '0%': {
        opacity: 1,
        backgroundColor: darken(0.3, theme.color.success.base),
      },
      '100%': {
        opacity: 0,
        backgroundColor: 'transparent',
      }
    },
    '@keyframes arwes-highlight-click-alert': {
      '0%': {
        opacity: 1,
        backgroundColor: darken(0.3, theme.color.alert.base),
      },
      '100%': {
        opacity: 0,
        backgroundColor: 'transparent',
      }
    },
  };
};
