import { ThemeSetup, ThemePalette } from '../constants';
import { createThemePaletteBasic } from '../createThemePaletteBasic';
import { createThemePaletteElevation } from '../createThemePaletteElevation';

const createThemePalette = (setup: ThemeSetup): ThemePalette => {
  const {
    tonalOffset,
    elevationOffset,
    ...otherFeatures
  } = setup.palette;

  return Object.freeze({
    ...otherFeatures,
    tonalOffset,
    elevationOffset,
    primary: createThemePaletteBasic({ main: '#0ff', ...setup.palette.primary }, tonalOffset),
    secondary: createThemePaletteBasic({ main: '#ff0', ...setup.palette.secondary }, tonalOffset),
    success: createThemePaletteBasic({ main: '#0f0', ...setup.palette.success }, tonalOffset),
    error: createThemePaletteBasic({ main: '#f00', ...setup.palette.error }, tonalOffset),
    neutral: createThemePaletteElevation(setup.palette.neutral?.main ?? '#000', elevationOffset)
  });
};

export { createThemePalette };
