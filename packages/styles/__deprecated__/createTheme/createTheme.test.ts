/* eslint-env jest */

import { createTheme } from './createTheme';

test('Should be able to create theme with defaults', () => {
  createTheme();
});

test('Should be able to add extra theme settings (except for the defined main features)', () => {
  const theme = createTheme({ xxx: 1, yyy: 2, zzz: 3 });
  expect(theme).toMatchObject({ xxx: 1, yyy: 2, zzz: 3 });
});
