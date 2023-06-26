import { style, globalStyle } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center'
});

globalStyle(`${root} a, ${root} button`, {
  display: 'grid',
  gridAutoFlow: 'column',
  columnGap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  padding: '0 0.25rem',
  color: 'hsl(180 82.31% 71.18%)',
  cursor: 'pointer',
  opacity: 0.8,
  transitionProperty: 'opacity, transform, outline, border, color, background',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${root} a::before, ${root} button::before`, {
  content: '""',
  display: 'block',
  position: 'absolute',
  zIndex: 100,
  left: 0,
  right: 0,
  bottom: 0,
  borderTop: '1px solid hsl(180 82.31% 71.18%)',
  transform: 'scaleX(0)',
  transitionProperty: 'opacity, transform, outline, border, color, background',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${root} a:hover::before, ${root} button:hover::before`, {
  transform: 'scaleX(1)'
});

globalStyle(`${root} a:hover, ${root} button:hover`, {
  color: 'hsl(180 82.31% 81.18%)',
  opacity: 1
});

globalStyle(`${root} a:focus, ${root} button:focus`, {
  opacity: 1,
  outline: '1px dotted hsl(180 100% 40% / 50%)'
});

export const active = style({});

globalStyle(`${active} a, ${active} button`, {
  color: 'hsl(60 82.31% 71.18%)',
  borderBottom: '1px solid hsl(60 82.31% 71.18%)'
});

globalStyle(`${active} a::before, ${active} button::before`, {
  bottom: 1,
  borderColor: 'hsl(60 82.31% 71.18%)'
});

globalStyle(`${active} a:hover, ${active} button:hover`, {
  color: 'hsl(60 82.31% 81.18%)',
  borderColor: 'hsl(60deg 100% 40% / 50%)'
});

globalStyle(`${active} a:focus, ${active} button:focus`, {
  outline: '1px dotted hsl(60 100% 40% / 50%)'
});
