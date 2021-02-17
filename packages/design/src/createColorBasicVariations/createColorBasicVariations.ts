import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';

import {
  ThemeSettingsPaletteColorBasic,
  ThemePaletteColorBasic
} from '../constants';
import { updateColorContrastLuminance } from '../updateColorContrastLuminance';

const createColorBasicVariations = (
  color: ThemeSettingsPaletteColorBasic,
  tonalOffset: number,
  contrastOffset: number
): ThemePaletteColorBasic => {
  if (!color.main) {
    throw new Error('Theme color requires "main" color.');
  }

  const { main } = color;
  const dark = color.dark ?? darken(tonalOffset, main);
  const light = color.light ?? lighten(tonalOffset, main);
  const contrast = color.contrast ?? updateColorContrastLuminance(contrastOffset, main);

  return Object.freeze({ main, dark, light, contrast });
};

export { createColorBasicVariations };
