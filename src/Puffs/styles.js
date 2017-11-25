import { rgba } from 'polished';

export default (theme) => {

  const duration = 1000;
  const colorAlpha = theme.alpha / 1.5;
  const shadow1 = theme.shadowLength;
  const shadow2 = theme.shadowLength * 2;

  return {
    root: {
      display: 'block',
      position: 'relative',
    },
    children: {
      display: 'block',
    },
    puff: {
      position: 'absolute',
      display: 'block',
      width: 1,
      height: 1,
      backgroundColor: rgba(theme.color.primary.base, colorAlpha),
      boxShadow: `0 0 ${shadow1}px ${shadow1}px ` + rgba(theme.color.primary.base, colorAlpha),
      borderRadius: '50%',
      opacity: 0,
      animation: `arwes-puff ${duration}ms ease-out 0ms 1`,
    },
    puffLong: {
      boxShadow: `0 0 ${shadow2}px ${shadow2}px ` + rgba(theme.color.primary.base, colorAlpha),
      animation: `arwes-puff-1 ${duration}ms ease-out 0ms 1`,
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
