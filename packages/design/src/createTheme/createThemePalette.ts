import { ThemeSetup, ThemePalette } from '../constants';
import { createColorRaysVariations } from '../createColorRaysVariations';
import { createColorBasicVariations } from '../createColorBasicVariations';
import { createColorElevationVariations } from '../createColorElevationVariations';

const createThemePalette = (setup: ThemeSetup): ThemePalette => {
  const {
    tonalOffset,
    contrastOffset,
    elevationOffset,
    ...otherFeatures
  } = setup.palette;

  return Object.freeze({
    ...otherFeatures,
    tonalOffset,
    contrastOffset,
    elevationOffset,
    primary: createColorRaysVariations({ main: '#0ff', ...setup.palette.primary }, tonalOffset),
    secondary: createColorRaysVariations({ main: '#ff0', ...setup.palette.secondary }, tonalOffset),
    success: createColorBasicVariations({ main: '#0f0', ...setup.palette.success }, tonalOffset, contrastOffset),
    info: createColorBasicVariations({ main: '#00f', ...setup.palette.info }, tonalOffset, contrastOffset),
    warn: createColorBasicVariations({ main: '#fa0', ...setup.palette.warn }, tonalOffset, contrastOffset),
    error: createColorBasicVariations({ main: '#f00', ...setup.palette.error }, tonalOffset, contrastOffset),
    neutral: createColorElevationVariations(setup.palette.neutral?.main ?? '#000', elevationOffset)
  });
};

export { createThemePalette };
