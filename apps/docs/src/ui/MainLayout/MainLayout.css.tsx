import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'absolute',
  overflow: 'hidden',
  inset: 0,
  display: 'flex',
  background: 'radial-gradient(50% 50% at 50% 50%, #04252B 0%, #002424 0.01%, #001515 100%)',
  minWidth: 0,
  minHeight: 0
});

export const container = style({
  zIndex: 100,
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minWidth: 0,
  minHeight: 0
});
