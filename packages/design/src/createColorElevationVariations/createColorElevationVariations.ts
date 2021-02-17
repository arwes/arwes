import { ThemePaletteColorElevation } from '../constants';
import { updateColorContrastLuminance } from '../updateColorContrastLuminance';

const createColorElevationVariations = (
  main: string,
  elevationOffset: number
): ThemePaletteColorElevation => {
  const elevate = (level: number): string => {
    const value = elevationOffset * level;

    if (value === 0) {
      return main;
    }

    return updateColorContrastLuminance(value, main);
  };

  return Object.freeze({ main, elevate });
};

export { createColorElevationVariations };
