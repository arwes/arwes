import { style, globalStyle } from '@vanilla-extract/css';

export const linkPrimary = style({});

globalStyle(`${linkPrimary}:is(a), ${linkPrimary} a`, {
  color: 'hsl(180 82.31% 71.18%)',
  textShadow: '0px 0px 1px hsl(180deg 50% 75% / 0.5)'
});

globalStyle(`${linkPrimary}:is(a):hover, ${linkPrimary} a:hover`, {
  color: 'hsl(180 82.31% 81.18%)'
});

globalStyle(`${linkPrimary}:is(a):focus, ${linkPrimary} a:focus`, {
  outline: '1px dotted hsl(180deg 100% 40% / 50%)'
});
