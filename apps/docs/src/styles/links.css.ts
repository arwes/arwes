import { style, globalStyle } from '@vanilla-extract/css';

export const linkPrimary = style({});

globalStyle(`${linkPrimary}:is(a), ${linkPrimary} a`, {
  color: 'hsl(180deg 88.18% 56.86%)',
  textShadow: '0px 0px 1px hsl(180deg 50% 75% / 0.5)'
});

globalStyle(`${linkPrimary}:is(a):hover, a:hover`, {
  color: 'hsl(180deg 88.18% 66.86%)'
});
