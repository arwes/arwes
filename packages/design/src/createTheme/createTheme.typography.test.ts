/* eslint-env jest */

import { createTheme } from './createTheme';

test('Should create empty typography styles if nothing is configured', () => {
  const theme = createTheme();
  expect(theme.typography).toEqual({});
});

test('Should allow to setup HTMLElement typography styles', () => {
  const theme = createTheme({
    typography: {
      h1: { fontSize: 14 },
      h2: { fontFamily: 'sans' },
      h3: { lineHeight: 1.5 },
      p: { fontFamily: 'arial', fontSize: '2rem' },
      button: { fontFamily: 'monospace', lineHeight: '1' }
    }
  });
  expect(theme.typography).toEqual({
    h1: { fontSize: 14 },
    h2: { fontFamily: 'sans' },
    h3: { lineHeight: 1.5 },
    p: { fontFamily: 'arial', fontSize: '2rem' },
    button: { fontFamily: 'monospace', lineHeight: '1' }
  });
});

test('Should filter non-typography styles', () => {
  const blockquoteStyles: any = { fontSize: 14, color: 'red', textTransform: 'uppercase' };
  const formStyles: any = { fontFamily: 'sans', padding: 20, border: 'none' };
  const theme = createTheme({
    typography: {
      blockquote: blockquoteStyles,
      form: formStyles
    }
  });
  expect(theme.typography).toEqual({
    blockquote: { fontSize: 14 },
    form: { fontFamily: 'sans' }
  });
});

test('Should create "root" group for HTMLElements html, body', () => {
  const theme = createTheme({
    typography: {
      root: { fontSize: 10 },
      html: { fontSize: 20 },
      body: { fontSize: 30 }
    }
  });
  expect(theme.typography).toEqual({
    'html, body': { fontSize: 10 },
    html: { fontSize: 20 },
    body: { fontSize: 30 }
  });
});

test('Should create "headings" group for HTMLElements h1, h2, h3, h4, h5, h6', () => {
  const theme = createTheme({
    typography: {
      headings: { fontFamily: 'sans' },
      h1: { fontSize: 20 },
      h2: { fontSize: 30 }
    }
  });
  expect(theme.typography).toEqual({
    'h1, h2, h3, h4, h5, h6': { fontFamily: 'sans' },
    h1: { fontSize: 20 },
    h2: { fontSize: 30 }
  });
});

test('Should create "codes" group for HTMLElements code, pre', () => {
  const theme = createTheme({
    typography: {
      codes: { fontFamily: 'monospace' },
      code: { fontSize: 20 },
      pre: { fontSize: 30 }
    }
  });
  expect(theme.typography).toEqual({
    'code, pre': { fontFamily: 'monospace' },
    code: { fontSize: 20 },
    pre: { fontSize: 30 }
  });
});

test('Should create "controls" group for HTMLElements input, textarea, select, option, button', () => {
  const theme = createTheme({
    typography: {
      controls: { fontFamily: 'arial' },
      input: { fontSize: 20 },
      button: { fontSize: 30 }
    }
  });
  expect(theme.typography).toEqual({
    'input, textarea, select, option, button': { fontFamily: 'arial' },
    input: { fontSize: 20 },
    button: { fontSize: 30 }
  });
});

test('Should create mobile-first media queries for styles if provided as array', () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 100,
        md: 200
      }
    },
    typography: {
      h1: [
        { fontSize: 10 },
        { fontSize: 20 },
        { fontSize: 30 }
      ]
    }
  });
  expect(theme.typography).toEqual({
    h1: {
      fontSize: 10,
      '@media screen and (min-width: 100px)': { fontSize: 20 },
      '@media screen and (min-width: 200px)': { fontSize: 30 }
    }
  });
});

test('Should create mobile-first media queries for styles if provided as array with undefined breakpoints', () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 100,
        md: 200,
        lg: 300,
        xl: 400
      }
    },
    typography: {
      h1: [
        { fontFamily: '10' },
        undefined,
        { fontFamily: '30' },
        undefined,
        { fontFamily: '50' }
      ]
    }
  });
  expect(theme.typography).toEqual({
    h1: {
      fontFamily: '10',
      '@media screen and (min-width: 200px)': { fontFamily: '30' },
      '@media screen and (min-width: 400px)': { fontFamily: '50' }
    }
  });
});

test('Should create mobile-first media queries for styles if provided as array with first breakpoint different to 0', () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 100,
        sm: 200
      }
    },
    typography: {
      h1: [
        { fontSize: 10 },
        { fontSize: 20 }
      ]
    }
  });
  expect(theme.typography).toEqual({
    h1: {
      '@media screen and (min-width: 100px)': { fontSize: 10 },
      '@media screen and (min-width: 200px)': { fontSize: 20 }
    }
  });
});

test('Should extend multiple themes', () => {
  const theme1 = createTheme({
    typography: {
      h1: { fontSize: 10, lineHeight: 1 },
      h2: { fontSize: 20, lineHeight: 2 }
    }
  });
  const theme2 = createTheme({
    typography: {
      h2: { fontSize: 30 },
      h3: { fontSize: 40 }
    }
  }, theme1);
  expect(theme2.typography).toEqual({
    h1: { fontSize: 10, lineHeight: 1 },
    h2: { fontSize: 30 },
    h3: { fontSize: 40 }
  });
});
