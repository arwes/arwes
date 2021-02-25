import { ThemeSetup, ThemePalette } from '../constants';
import { createColorBasicVariations } from '../createColorBasicVariations';
import { createColorElevationVariations } from '../createColorElevationVariations';

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
    primary: createColorBasicVariations({ main: '#0ff', ...setup.palette.primary }, tonalOffset),
    secondary: createColorBasicVariations({ main: '#ff0', ...setup.palette.secondary }, tonalOffset),
    success: createColorBasicVariations({ main: '#0f0', ...setup.palette.success }, tonalOffset),
    error: createColorBasicVariations({ main: '#f00', ...setup.palette.error }, tonalOffset),
    neutral: createColorElevationVariations(setup.palette.neutral?.main ?? '#000', elevationOffset)
  });
};

export { createThemePalette };
