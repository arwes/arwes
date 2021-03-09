import { ThemePaletteElevation } from '../constants';
import { updateColorContrastLuminance } from '../updateColorContrastLuminance';

const createThemePaletteElevation = (main: string, elevationOffset: number): ThemePaletteElevation => {
  const elevate = (level: number): string => {
    const value = elevationOffset * level;

    if (value === 0) {
      return main;
    }

    return updateColorContrastLuminance(value, main);
  };

  return Object.freeze({ main, elevate });
};

export { createThemePaletteElevation };
