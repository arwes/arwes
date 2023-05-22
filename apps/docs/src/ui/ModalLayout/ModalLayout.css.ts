import { style, globalStyle } from '@vanilla-extract/css';

export const root = style({
  position: 'absolute',
  zIndex: 100,
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.5rem'
});

export const bg = style({
  position: 'absolute',
  margin: 0,
  inset: 0,
  background: 'hsla(180deg, 50%, 5%, 0.95)'
});

export const container = style({
  position: 'relative',
  display: 'flex',
  padding: '2rem',
  width: '100%',
  minWidth: 300,
  minHeight: 300,
  maxWidth: 500,
  maxHeight: 800
});

export const frames = style({
  position: 'absolute',
  inset: 0
});

export const frame1 = style({});

globalStyle(`${frame1} [data-name="shape"]`, {
  color: 'hsla(180deg, 50%, 8%)'
});

globalStyle(`${frame1} [data-name="decoration"]`, {
  color: 'hsla(180deg, 50%, 20%, 1)'
});

export const frame2 = style({});

globalStyle(`${frame2} [data-name="shape"]`, {
  display: 'none'
});

globalStyle(`${frame2} [data-name="decoration"]`, {
  color: 'hsla(180deg, 50%, 40%, 1)'
});

export const content = style({
  position: 'relative',
  zIndex: 10,
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: 'auto'
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const title = style({
  margin: '0 0 0.5rem'
});

export const close = style({
  padding: '0.25rem 0',
  fontSize: '1.25rem',
  color: ''
});

export const body = style({});
