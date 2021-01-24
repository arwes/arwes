/* eslint-env jest */

import { createTheme } from './createTheme';

test('Should allow to get z-indexes default empty object if not configured', () => {
  const theme = createTheme();
  expect(theme.zIndexes).toEqual({});
});

test('Should set zIndexes values', () => {
  const theme = createTheme({
    zIndexes: {
      menu: 10,
      popup: 20,
      tooltip: 30
    }
  });
  expect(theme.zIndexes).toEqual({
    menu: 10,
    popup: 20,
    tooltip: 30
  });
});

test('Should allow to extend multiple themes', () => {
  const theme1 = createTheme({
    zIndexes: {
      menu: 10,
      popup: 20
    }
  });
  const theme2 = createTheme({
    zIndexes: {
      popup: 200,
      tooltip: 300
    }
  }, theme1);
  expect(theme2.zIndexes).toEqual({
    menu: 10,
    popup: 200,
    tooltip: 300
  });
});
