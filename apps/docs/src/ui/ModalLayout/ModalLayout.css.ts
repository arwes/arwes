import { style, globalStyle } from '@vanilla-extract/css';

export const root = style({
  position: 'fixed',
  zIndex: 100,
  inset: 0,
  padding: '1.5rem',
  overflowY: 'auto',
  background: 'linear-gradient(to bottom right, hsla(180deg, 50%, 2%), hsla(180deg, 50%, 10%))'
});

export const container = style({
  position: 'relative',
  display: 'flex',
  margin: '0 auto',
  padding: '2rem',
  width: '100%',
  maxWidth: 500,
  minHeight: '100%'
});

export const frames = style({
  zIndex: -1,
  position: 'absolute',
  inset: 0
});

export const frame1 = style({});

globalStyle(`${frame1} [data-name=bg]`, {
  color: 'hsla(180, 100%, 7%, 0.5)'
});

globalStyle(`${frame1} [data-name=line]`, {
  color: 'hsla(180, 100%, 15%, 0.5)'
});

export const frame2 = style({});

globalStyle(`${frame2} [data-name=bg]`, {
  display: 'none'
});

globalStyle(`${frame2} [data-name=line]`, {
  color: 'hsla(180, 100%, 50%, 0.5)'
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 300
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
  border: 'none',
  padding: '0.25rem 0',
  fontSize: '1.25rem',
  cursor: 'pointer'
});

export const body = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
});

export const footer = style({});
