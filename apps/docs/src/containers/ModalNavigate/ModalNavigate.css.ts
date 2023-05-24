import { style } from '@vanilla-extract/css';
import { createFrameOctagonClip } from '@arwes/react';

export const links = style({
  display: 'grid',
  rowGap: '1rem',
  marginBottom: '1.5rem'
});

export const link = style({
  display: 'flex',
  justifyContent: 'space-between'
});

export const linkAnchor = style({
  flex: 1,
  padding: '0.5rem 1rem',
  clipPath: createFrameOctagonClip({ squareSize: '12px', leftTop: false, leftBottom: false, rightBottom: false })
});

export const linkOpen = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '1rem',
  width: '3rem',
  height: '100%',
  clipPath: createFrameOctagonClip({ squareSize: '12px', leftTop: false, leftBottom: false, rightBottom: false })
});

export const social = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gridAutoFlow: 'row',
  gap: '0.5rem',
  marginBottom: '1.5rem',

  '@media': {
    '(min-width: 480px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(1, 1fr)'
    }
  }
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

export const surface = style({
  backgroundColor: 'hsla(180deg, 100%, 50%, 0.02)',

  ':hover': {
    backgroundColor: 'hsla(180deg, 100%, 50%, 0.04)'
  }
});
