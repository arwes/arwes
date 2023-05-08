// Extending https://necolas.github.io/normalize.css.

import { globalStyle } from '@vanilla-extract/css';
import { createFrameOctagonClip } from '@arwes/react';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0
});

globalStyle('html, body', {
  // Prevent adjustments of font size after orientation changes in iOS.
  WebkitTextSizeAdjust: '100%',

  WebkitFontSmoothing: 'antialiased',

  fontFamily: '"Titillium Web", "Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
  fontSize: '100%',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '1.5',
  color: 'hsl(180deg 50% 75%)',

  backgroundColor: '#050b0b',

  scrollbarWidth: 'auto',
  scrollbarColor: 'hsla(60, 83%, 71%, 0.5) transparent'
});

globalStyle('::-webkit-scrollbar', {
  width: '0.625rem',
  height: '0.625rem'
});

globalStyle('::-webkit-scrollbar-track, ::-webkit-scrollbar-corner', {
  background: 'hsla(180, 33%, 45%, 0.05)'
});

globalStyle('::-webkit-scrollbar-thumb', {
  border: '1px solid hsla(60, 83%, 71%, 0.5)',
  background: 'transparent',
  transition: 'border 200ms ease-out'
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  border: '1px solid hsla(60, 83%, 71%, 1)'
});

globalStyle('::selection', {
  backgroundColor: 'hsla(180, 50%, 75%, 0.25)'
});

// TEXTS

globalStyle(`
  :where(
    h1:not(:last-child),
    h2:not(:last-child),
    h3:not(:last-child),
    h4:not(:last-child),
    h5:not(:last-child),
    h6:not(:last-child),
    p:not(:last-child),
    blockquote:not(:last-child),
    pre:not(:last-child),
    figure:not(:last-child),
    table:not(:last-child),
    hr:not(:last-child)
  )
`, {
  marginBottom: '1.5rem'
});

globalStyle(`
  :where(
    h1:not(:first-child),
    h2:not(:first-child),
    h3:not(:first-child)
  )
`, {
  marginTop: '3rem'
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontStyle: 'normal',
  fontWeight: 300,
  color: 'hsl(180deg 100% 60%)',
  textShadow: '0px 0px 1px hsl(180deg 100% 60% / 0.5)',
  scrollMarginTop: '3rem'
});

globalStyle('h1', { fontSize: '1.75rem' });
globalStyle('h2', { fontSize: '1.625rem' });
globalStyle('h3', { fontSize: '1.5rem' });
globalStyle('h4', { fontSize: '1.375rem' });
globalStyle('h5', { fontSize: '1.25rem' });
globalStyle('h6', { fontSize: '1.125rem' });

globalStyle('p', {
  fontSize: '1rem'
});

globalStyle('b, strong', {
  fontWeight: 'bolder'
});

globalStyle('small', {
  fontSize: '75%'
});

// Prevent `sub` and `sup` elements from affecting the line height in all browsers.
globalStyle('sub, sup', {
  position: 'relative',
  fontSize: '75%',
  lineHeight: 0,
  verticalAlign: 'baseline'
});

globalStyle('sub', {
  bottom: '-0.25em'
});

globalStyle('sup', {
  top: '-0.5em'
});

// Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
globalStyle('abbr[title]', {
  borderBottom: 'none',
  textDecoration: 'underline dotted'
});

// Correct the inheritance and scaling of font size in all browsers.
globalStyle('kbd, samp', {
  fontFamily: 'monospace, monospace',
  fontSize: '1rem'
});

globalStyle('a', {
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, outline',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-out',
  color: 'hsl(60deg 50% 75%)',
  textShadow: '0px 0px 1px hsl(60deg 50% 75% / 0.5)',
  textDecoration: 'none'
});

globalStyle('a:hover', {
  color: 'hsl(60deg 50% 85%)'
});

globalStyle('a:focus', {
  outline: '1px dotted hsl(60deg 100% 40% / 50%)'
});

globalStyle('blockquote', {
  display: 'block',
  border: 'none',
  borderLeft: '0.25rem solid hsl(180deg 69.7% 67.65%)',
  padding: '1rem 1rem 1rem 1.25rem',
  width: '100%',
  backgroundColor: 'hsl(180deg 28.67% 71.96% / 8%)',
  clipPath: createFrameOctagonClip({ squareSize: '0.75rem', leftTop: false, leftBottom: false })
});

globalStyle('code, pre', {
  // Correct the inheritance and scaling of font size in all browsers.
  fontFamily: 'JetBrains Mono,Menlo,Monaco,Consolas,Courier New,monospace'
});

globalStyle('code', {
  fontSize: '75%'
});

globalStyle('pre', {
  display: 'block',
  borderWidth: '1px 0',
  borderStyle: 'solid',
  borderColor: 'hsl(180deg 70% 25%)',
  padding: '1rem',
  fontSize: '0.75rem',
  backgroundColor: 'hsl(180deg 25% 15% / 25%)'
});

// LINES

globalStyle('hr', {
  position: 'relative',
  border: 'none',
  borderBottom: '1px solid hsla(180, 33%, 45%, 0.5)',
  width: '100%',
  height: 2,
  transformOrigin: 'left center'
});

globalStyle('hr::after', {
  content: '""',
  position: 'absolute',
  right: 0,
  bottom: 0,
  display: 'block',
  width: '1.5rem',
  height: 0,
  borderBottom: '1px solid hsla(180, 69%, 67%, 0.5)'
});

// TABLES

globalStyle('table', {
  borderCollapse: 'separate',
  borderSpacing: '0.25rem',
  width: '100%',
  textAlign: 'left'
});

globalStyle('thead tr', {
  backgroundColor: 'hsl(180deg 29% 72% / 3%)'
});

globalStyle('thead th, thead td', {
  fontSize: '0.875rem',
  borderBottom: '1px solid hsl(180deg 33.04% 45.1%)'
});

globalStyle('tbody tr', {
  backgroundColor: 'hsl(180deg 29% 72% / 3%)'
});

globalStyle('tbody tr:hover', {
  backgroundColor: 'hsl(180deg 29% 72% / 9%)'
});

globalStyle('th, td', {
  padding: '0.25rem 0.75rem',
  verticalAlign: 'top'
});

globalStyle('tr', {
  transition: 'background-color 0.2s ease-out'
});

// ASSETS

globalStyle('img', {
  display: 'block',
  maxWidth: '100%'
});

// FORMS

globalStyle('button', {
  outline: 'none',
  border: 'none'
});
