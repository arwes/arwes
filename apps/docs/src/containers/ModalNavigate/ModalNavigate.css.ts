import { style } from '@vanilla-extract/css';
import { createFrameOctagonClip } from '@arwes/react';

export const links = style({
  display: 'grid',
  rowGap: '1rem',
  marginBottom: '1.5rem'
});

export const link = style({
  display: 'flex',
  flexDirection: 'row'
});

export const linkAnchor = style({
  flex: 1,
  padding: '0.5rem 1rem',
  clipPath: createFrameOctagonClip({ squareSize: '12px', leftTop: false, leftBottom: false, rightBottom: false })
});

export const linkButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  width: '3rem',
  height: '100%',
  clipPath: createFrameOctagonClip({ squareSize: '12px', leftTop: false, leftBottom: false, rightBottom: false }),
  cursor: 'pointer'
});

export const linkButtonLeft = style({
  marginRight: '1rem'
});

export const linkButtonRight = style({
  marginLeft: '1rem'
});

export const social = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridAutoFlow: 'row',
  gap: '0.5rem',
  marginBottom: '1.5rem'
});

export const socialLink = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.875rem',
  clipPath: createFrameOctagonClip({ squareSize: '12px' })
});

export const version = style({
  display: 'flex',
  justifyContent: 'center'
});

export const surfacePrimary = style({
  backgroundColor: 'hsla(180deg, 100%, 50%, 0.02)',

  ':hover': {
    backgroundColor: 'hsla(180deg, 100%, 50%, 0.04)'
  }
});

export const surfaceSecondary = style({
  backgroundColor: 'hsla(60deg, 100%, 50%, 0.02)',

  ':hover': {
    backgroundColor: 'hsla(60deg, 100%, 50%, 0.04)'
  }
});
