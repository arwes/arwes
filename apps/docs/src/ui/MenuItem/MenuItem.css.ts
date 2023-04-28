import { style, globalStyle } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

globalStyle(`${root} a`, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.25rem',
  color: 'hsl(180 82.31% 71.18%)',
  opacity: 0.8,
  transitionProperty: 'opacity, color, outline',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${root} a:hover`, {
  color: 'hsl(180 82.31% 71.18%)',
  opacity: 1
});

globalStyle(`${root} a:focus`, {
  opacity: 1,
  outline: '1px dotted hsl(180 100% 40% / 50%)'
});

export const active = style({});

globalStyle(`${active} a`, {
  color: 'hsl(60 82.31% 71.18%)',
  borderBottom: '1px solid hsl(60 82.31% 71.18%)'
});

globalStyle(`${active} a:hover`, {
  color: 'hsl(60 82.31% 71.18%)'
});

globalStyle(`${active} a:focus`, {
  outline: '1px dotted hsl(60 100% 40% / 50%)'
});
