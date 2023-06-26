import { style, globalStyle } from '@vanilla-extract/css';

export const linkPrimary = style({});

globalStyle(`${linkPrimary}, ${linkPrimary} a`, {
  color: 'hsl(180deg 82.31% 71.18%)',
  textShadow: '0px 0px 1px hsl(180deg 50% 75% / 0.5)'
});

globalStyle(`${linkPrimary}:hover, ${linkPrimary} a:hover`, {
  color: 'hsl(180deg 82.31% 81.18%)'
});

globalStyle(`${linkPrimary}:focus, ${linkPrimary} a:focus`, {
  outline: '1px dotted hsl(180deg 100% 40% / 50%)'
});

export const linkSecondary = style({});

globalStyle(`${linkSecondary}, ${linkSecondary} a`, {
  color: 'hsl(60deg 82.31% 71.18%)',
  textShadow: '0px 0px 1px hsl(60deg 50% 75% / 0.5)'
});

globalStyle(`${linkSecondary}:hover, ${linkSecondary} a:hover`, {
  color: 'hsl(60deg 82.31% 81.18%)'
});

globalStyle(`${linkSecondary}:focus, ${linkSecondary} a:focus`, {
  outline: '1px dotted hsl(60deg 100% 40% / 50%)'
});
