import { style, globalStyle } from '@vanilla-extract/css';
import { createFrameOctagonClip } from '@arwes/react';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  padding: '0 12px',
  minWidth: '60px',
  height: '24px',
  lineHeight: '24px',
  fontSize: 12,
  fontFamily: "'Titillium Web', sans-serif",
  fontWeight: '400',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'hsl(60deg 100% 75%)',
  textAlign: 'center',
  textShadow: '0px 0px 2px hsl(60deg 100% 75% / 50%)',
  background: 'transparent',
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out',

  ':hover': {
    color: 'hsl(60deg 100% 85%)'
  },
  ':focus': {
    outline: '1px dotted hsl(60deg 100% 40% / 50%)'
  },

  '@media': {
    '(min-width: 768px)': {
      padding: '0 16px',
      height: '28px',
      lineHeight: '28px',
      fontSize: 14
    }
  }
});

export const medium = style({
  padding: '0 32px',
  height: '32px',
  lineHeight: '32px',
  fontSize: 14,

  '@media': {
    '(min-width: 768px)': {
      padding: '0 48px',
      height: '36px',
      lineHeight: '36px',
      fontSize: 16
    }
  }
});

export const content = style({
  display: 'inline-grid',
  gridAutoFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 8,
  zIndex: 2,
  textDecoration: 'none'
});

globalStyle(`${content} svg`, {
  margin: 0
});

export const frameElement = style({});

// Frame Simple

export const frameSimple = style({});

export const frameSimpleDeco = style({
  ':before': {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    borderTop: '1px solid hsl(60deg 100% 75%)',
    transform: 'translate(-4px, -4px) scaleX(0.1)',
    transformOrigin: 'right bottom',
    transitionProperty: 'border, transform, opacity',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out'
  },
  ':after': {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '100%',
    borderLeft: '1px solid hsl(60deg 100% 75%)',
    transform: 'translate(-4px, -4px) scaleY(0.2)',
    transformOrigin: 'right bottom',
    transitionProperty: 'border, transform, opacity',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out'
  },

  selectors: {
    [`${root}:hover &:before, ${root}:hover &:after`]: {
      borderColor: 'hsl(60deg 100% 40% / 50%)',
      transform: 'translate(0, 0) scale(1)'
    }
  }
});

// Frame Hexagon

export const frameHexagon = style({});

export const frameHexagonClip = style({
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  display: 'block',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  clipPath: createFrameOctagonClip({ squareSize: 12, leftBottom: false, rightTop: false })
});

export const frameHexagonIlluminator = style({
  zIndex: 1
});

export const onHoverAnimateIcons = style({
  zIndex: 1
});

globalStyle(`${root} svg, ${root} path`, {
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
  transitionDuration: '200ms',
  transitionTimingFunction: 'ease-out'
});

globalStyle(`${onHoverAnimateIcons}:hover span + svg`, {
  transform: 'translateX(0.25rem)'
});

globalStyle(`${onHoverAnimateIcons}:hover svg:first-child`, {
  transform: 'translateX(-0.25rem)'
});

globalStyle(`${root} ${frameElement} [data-name=bg]`, {
  color: 'hsl(60deg 100% 40% / 8%)'
});

globalStyle(`${root} ${frameElement} [data-name=line]`, {
  color: 'hsl(60deg 100% 40% / 14%)'
});

globalStyle(`${root}:hover ${frameElement} [data-name=bg]`, {
  color: 'hsl(60deg 100% 40% / 16%)'
});

globalStyle(`${root}:hover ${frameElement} [data-name=line]`, {
  color: 'hsl(60deg 100% 40% / 22%)'
});
