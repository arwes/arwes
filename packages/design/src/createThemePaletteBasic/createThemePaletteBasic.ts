import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';

import { ThemeSettingsPaletteBasic, ThemePaletteBasic } from '../constants';

const createThemePaletteBasic = (color: ThemeSettingsPaletteBasic, tonalOffset: number): ThemePaletteBasic => {
  if (!color.main) {
    throw new Error('Theme color requires "main" color.');
  }

  const { main } = color;
  const dark1 = color.dark1 ?? darken(tonalOffset, main);
  const dark2 = color.dark2 ?? darken(tonalOffset * 2, main);
  const dark3 = color.dark3 ?? darken(tonalOffset * 3, main);
  const light1 = color.light1 ?? lighten(tonalOffset, main);
  const light2 = color.light2 ?? lighten(tonalOffset * 2, main);
  const light3 = color.light3 ?? lighten(tonalOffset * 3, main);

  return Object.freeze({
    main,
    dark1,
    dark2,
    dark3,
    light1,
    light2,
    light3
  });
};

export { createThemePaletteBasic };
